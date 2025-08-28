import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import "../css/Profilepage.css";

interface ISkill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface IProfileForm {
  name: string; // from User
  bio: string;
  profilePicture: string; // URL
  profileFile?: File; // for uploading new image
  skills: ISkill[];
  github: string;
  linkedin: string;
  portfolioUrl: string;
  config: { mode: "view" | "edit" };
}

const defaultValues: IProfileForm = {
  name: "",
  bio: "",
  profilePicture: "",
  skills: [],
  github: "",
  linkedin: "",
  portfolioUrl: "",
  config: { mode: "view" },
};

function ProfilePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const methods = useForm<IProfileForm>({ defaultValues });
  const { watch, reset, setValue, register, control } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });
  const data = watch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return console.error("No token found");

    axios
      .get("http://localhost:3000/users/profile/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        const profileData = res.data;
        reset({
          name: profileData.user?.name || "",
          bio: profileData.bio || "",
          profilePicture: profileData.profilePicture || "",
          skills: profileData.skills || [],
          github: profileData.github || "",
          linkedin: profileData.linkedin || "",
          portfolioUrl: profileData.portfolioUrl || "",
          config: { mode: "view" },
        });
        setPreview(profileData.profilePicture || null);
      })
      .catch((err) => console.error("Failed to load profile", err));
  }, [reset]);

  const onClickEdit = () => setValue("config.mode", "edit");
  const goBackButton = () => setValue("config.mode", "view");

  const addSkill = () => append({ name: "", level: "Beginner" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("profileFile", e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdate = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const formData = new FormData();
    formData.append("bio", data.bio);
    formData.append("github", data.github);
    formData.append("linkedin", data.linkedin);
    formData.append("portfolioUrl", data.portfolioUrl);
    data.skills.forEach((skill, index) => {
      formData.append(`skills[${index}][name]`, skill.name);
      formData.append(`skills[${index}][level]`, skill.level);
    });
    if (data.profileFile) {
      formData.append("profileImg", data.profileFile);
    }

    try {
      await axios.put("http://localhost:3000/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
      setValue("config.mode", "view");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>

      {data.config.mode === "view" && (
        <>
          <div className="profile-header">
            <button className="edit-btn" onClick={onClickEdit}>Edit Profile</button>
          </div>
          <div className="profile-details">
            {preview && <img src={preview} alt="Profile" className="profile-img" />}
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Bio:</strong> {data.bio}</p>
            <p><strong>GitHub:</strong> {data.github}</p>
            <p><strong>LinkedIn:</strong> {data.linkedin}</p>
            <p><strong>Portfolio:</strong> {data.portfolioUrl}</p>
            <p><strong>Skills:</strong></p>
            <ul>
              {data.skills.map((skill, i) => <li key={i}>{skill.name} ({skill.level})</li>)}
            </ul>
          </div>
        </>
      )}

      {data.config.mode === "edit" && (
        <div className="profile-edit">
          <input {...register("name")} placeholder="Name" className="form-input" />
          <textarea {...register("bio")} placeholder="Bio" className="form-textarea" />
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {preview && <img src={preview} alt="Preview" className="profile-img" />}
          <input {...register("github")} placeholder="GitHub URL" className="form-input" />
          <input {...register("linkedin")} placeholder="LinkedIn URL" className="form-input" />
          <input {...register("portfolioUrl")} placeholder="Portfolio URL" className="form-input" />

          <h3>Skills</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="skill-row">
              <input {...register(`skills.${index}.name`)} placeholder="Skill Name" className="form-input" />
              <select {...register(`skills.${index}.level`)} className="form-select">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addSkill}>Add Skill</button>

          <div className="button-group">
            <button onClick={goBackButton} className="cancel-btn">Go Back</button>
            <button type="button" className="update-btn" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
