import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

const Profile = ({ user }) => {
    console.log("Profile Component - User Data:", user);
    console.log("Profile Component - User Role:", user?.role);
    const isCandidate = user?.role === "candidate";
    console.log("Profile Component - isCandidate:", isCandidate);

    // Helper function to get currentCTC value safely
    const getCtcValue = (ctc) => {
        if (!ctc) return "";
        if (typeof ctc === "object" && ctc.amount !== undefined)
            return ctc.amount.toString();
        return ctc.toString();
    };

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        ...user,
        // Initialize with direct properties instead of nested profiles
        topSkills: user?.topSkills || [],
        availability: user?.availability,
        currentCTC: getCtcValue(user?.currentCTC),
        designation: user?.designation,
        company: user?.company,
    });
    console.log("Profile Component - Initial Profile Data:", profileData);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        setProfileData((prev) => ({
            ...prev,
            ...user,
            // Make sure to handle currentCTC properly in the effect too
            currentCTC: getCtcValue(user?.currentCTC),
        }));
    }, [user]);

    // Calculate profile completion percentage
    useEffect(() => {
        // Define fields to check for each role
        const basicFields = ["firstName", "lastName", "email", "emailVerified"];
        const candidateFields = [
            "topSkills",
            "currentLocation",
            "phoneNumber",
            "linkedinProfile",
            "availability",
            "currentCTC",
        ];
        const recruiterFields = [
            "designation",
            "company",
            "phoneNumber",
            "location",
            "linkedinProfile",
        ];

        // Count completed basic fields
        let completedBasic = basicFields.filter((field) =>
            Boolean(profileData?.[field])
        ).length;

        // Calculate basic completion (20%)
        let basicPercentage = (completedBasic / basicFields.length) * 20;

        // Role specific field calculation (80%)
        let roleSpecificPercentage = 0;

        if (isCandidate) {
            // Check topSkills array has content
            const hasSkills =
                profileData?.topSkills?.filter((s) => s?.trim()).length > 0;

            // Count completed fields
            let completed = candidateFields.filter((field) => {
                if (field === "topSkills") return hasSkills;
                return Boolean(profileData?.[field]);
            }).length;

            roleSpecificPercentage = (completed / candidateFields.length) * 80;
        } else {
            // Check company object has required fields
            const hasValidCompany =
                profileData?.company?.name && profileData?.company?.description;

            // Count completed fields
            let completed = recruiterFields.filter((field) => {
                if (field === "company") return hasValidCompany;
                return Boolean(profileData?.[field]);
            }).length;

            roleSpecificPercentage = (completed / recruiterFields.length) * 80;
        }

        // Calculate total and round to nearest integer
        const total = Math.round(basicPercentage + roleSpecificPercentage);
        setCompletionPercentage(total > 100 ? 100 : total);
    }, [profileData, isCandidate]);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // TODO: Implement file upload to storage
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData((prev) => ({
                    ...prev,
                    profilePicture: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");

            // Format website URL if it exists
            const formattedCompany = profileData.company
                ? {
                      ...profileData.company,
                      website: profileData.company.website
                          ? profileData.company.website.startsWith("http://") ||
                            profileData.company.website.startsWith("https://")
                              ? profileData.company.website
                              : `https://${profileData.company.website}`
                          : "",
                  }
                : null;

            // Format CTC as object with amount and currency
            const formattedCTC = {
                amount: parseFloat(profileData.currentCTC) || 0,
                currency: "INR",
            };

            // Format availability to match backend enum values
            const formattedAvailability =
                profileData.availability === "immediate"
                    ? "Immediate"
                    : profileData.availability === "15days"
                    ? "15 Days"
                    : profileData.availability === "30days"
                    ? "30 Days"
                    : profileData.availability;

            // Prepare the data to send
            const updates = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                profilePicture: profileData.profilePicture,
                phoneNumber: profileData.phoneNumber,
                location: profileData.location,
                linkedinProfile: profileData.linkedinProfile,
                ...(isCandidate
                    ? {
                          topSkills: profileData.topSkills,
                          currentLocation: profileData.currentLocation,
                          availability: formattedAvailability,
                          currentCTC: formattedCTC,
                      }
                    : {
                          designation: profileData.designation,
                          company: formattedCompany,
                      }),
            };

            // Make API call to backend
            const response = await axios.post(
                "http://localhost:8000/auth/update-profile",
                {
                    uid: user.firebaseUID,
                    updates: updates,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update local state and localStorage with server response
            if (response.data && response.data.user) {
                const updatedUser = response.data.user;
                setProfileData(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to save profile");
        } finally {
            setSaving(false);
        }
    };

    // Generate tips based on completion percentage
    const getCompletionTips = () => {
        if (completionPercentage < 40) {
            return isCandidate
                ? "Add your skills, current location, and contact information"
                : "Add your designation, company details, and contact information";
        } else if (completionPercentage < 70) {
            return isCandidate
                ? "Complete your profile with availability and LinkedIn profile"
                : "Add your company's website and complete your LinkedIn profile";
        } else if (completionPercentage < 100) {
            return "Almost there! Upload a profile picture to complete your profile";
        } else {
            return "Great job! Your profile is complete";
        }
    };

    return (
        <div className={styles["profile-background"]}>
            <div className={styles["profile-container"]}>
                {/* Left Sidebar */}
                <div className={styles["profile-sidebar"]}>
                    {/* Profile Avatar */}
                    <div className={styles["profile-avatar"]}>
                        {profileData?.profilePicture ? (
                            <img
                                src={profileData.profilePicture}
                                alt="Profile"
                            />
                        ) : (
                            <div className={styles["avatar-placeholder"]}>
                                {profileData?.firstName?.charAt(0)}
                                {profileData?.lastName?.charAt(0)}
                            </div>
                        )}
                        {isEditing && (
                            <div className={styles["avatar-upload"]}>
                                <label
                                    htmlFor="profile-picture"
                                    className={styles["upload-button"]}
                                >
                                    Change Picture
                                    <input
                                        type="file"
                                        id="profile-picture"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Basic Profile Info */}
                    <div className={styles["profile-info-basic"]}>
                        <h2>
                            {profileData?.firstName} {profileData?.lastName}
                        </h2>
                        <p className={styles["role-badge"]}>
                            {isCandidate ? "Job Seeker" : "Recruiter"}
                        </p>
                        <p className={styles.email}>{profileData?.email}</p>
                        {profileData?.linkedinProfile && (
                            <a
                                href={profileData.linkedinProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles["linkedin-link"]}
                            >
                                <i className="fab fa-linkedin"></i> LinkedIn
                                Profile
                            </a>
                        )}
                    </div>

                    {/* Profile Completion Tracker */}
                    <div className={styles["completion-tracker"]}>
                        <div className={styles["completion-header"]}>
                            <h3 className={styles["completion-title"]}>
                                Profile Completion
                            </h3>
                            <span className={styles["completion-percentage"]}>
                                {completionPercentage}%
                            </span>
                        </div>
                        <div className={styles["completion-bar"]}>
                            <div
                                className={styles["completion-progress"]}
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                        <p className={styles["completion-tips"]}>
                            {getCompletionTips()}
                        </p>
                    </div>

                    {/* Edit Button */}
                    <button
                        className={`${styles["edit-button"]} ${
                            isEditing ? styles.save : ""
                        } ${saving ? styles.saving : ""}`}
                        onClick={() =>
                            isEditing ? handleSave() : setIsEditing(true)
                        }
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : isEditing
                            ? "Save Changes"
                            : "Edit Profile"}
                    </button>

                    {error && (
                        <div className={styles["error-message"]}>{error}</div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className={styles["profile-main"]}>
                    {isCandidate ? (
                        // Candidate Profile Sections
                        <>
                            <div
                                className={`${styles.section} ${styles.skills}`}
                            >
                                <h3>Top Skills</h3>
                                {isEditing ? (
                                    <div className={styles["skills-input"]}>
                                        {[0, 1, 2].map((index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                placeholder={`Skill ${
                                                    index + 1
                                                }`}
                                                value={
                                                    (profileData?.topSkills ||
                                                        [])[index] || ""
                                                }
                                                onChange={(e) => {
                                                    const newSkills = [
                                                        ...(profileData?.topSkills ||
                                                            []),
                                                    ];
                                                    newSkills[index] =
                                                        e.target.value;
                                                    setProfileData((prev) => ({
                                                        ...prev,
                                                        topSkills: newSkills,
                                                    }));
                                                }}
                                                maxLength={30}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles["skills-list"]}>
                                        {profileData?.topSkills?.length > 0 ? (
                                            profileData.topSkills.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className={
                                                            styles["skill-tag"]
                                                        }
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <p>No skills added yet</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div
                                className={`${styles.section} ${styles.contact}`}
                            >
                                <h3>Contact & Location</h3>
                                {isEditing ? (
                                    <div
                                        className={
                                            styles["contact-location-input"]
                                        }
                                    >
                                        <input
                                            type="text"
                                            placeholder="Current Location"
                                            value={
                                                profileData?.currentLocation ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    currentLocation:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={
                                                profileData?.phoneNumber || ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    phoneNumber: e.target.value,
                                                }))
                                            }
                                        />
                                        <input
                                            type="url"
                                            placeholder="LinkedIn Profile URL"
                                            value={
                                                profileData?.linkedinProfile ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    linkedinProfile:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            styles["contact-location-info"]
                                        }
                                    >
                                        {profileData?.currentLocation && (
                                            <p>{profileData.currentLocation}</p>
                                        )}
                                        {profileData?.phoneNumber && (
                                            <p>{profileData.phoneNumber}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div
                                className={`${styles.section} ${styles.availability}`}
                            >
                                <h3>Availability & Expected CTC</h3>
                                {isEditing ? (
                                    <div
                                        className={
                                            styles["availability-ctc-input"]
                                        }
                                    >
                                        <select
                                            value={
                                                profileData?.availability || ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    availability:
                                                        e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                -- Select Availability --
                                            </option>
                                            <option value="Immediate">
                                                Immediate
                                            </option>
                                            <option value="15 Days">
                                                15 Days
                                            </option>
                                            <option value="30 Days">
                                                30 Days
                                            </option>
                                        </select>
                                        <div className={styles["ctc-inputs"]}>
                                            <div>
                                                <label>
                                                    Current CTC (Yearly in LPA)
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.1"
                                                    placeholder="Current CTC"
                                                    value={
                                                        profileData?.currentCTC ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setProfileData(
                                                            (prev) => ({
                                                                ...prev,
                                                                currentCTC:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            styles["availability-ctc-info"]
                                        }
                                    >
                                        {profileData?.availability && (
                                            <p>{profileData.availability}</p>
                                        )}
                                        {profileData?.currentCTC && (
                                            <p>
                                                {typeof profileData.currentCTC ===
                                                "object"
                                                    ? `${
                                                          profileData.currentCTC
                                                              .amount
                                                      } ${
                                                          profileData.currentCTC
                                                              .currency || "LPA"
                                                      }`
                                                    : `${profileData.currentCTC} LPA`}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        // Recruiter Profile Sections
                        <>
                            <div
                                className={`${styles.section} ${styles.company}`}
                            >
                                <h3>Company Details</h3>
                                {isEditing ? (
                                    <div
                                        className={
                                            styles["company-details-input"]
                                        }
                                    >
                                        <input
                                            type="text"
                                            placeholder="Designation"
                                            value={
                                                profileData?.designation || ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    designation: e.target.value,
                                                }))
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            value={
                                                profileData?.company?.name || ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    company: {
                                                        ...(prev.company || {}),
                                                        name: e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                        <textarea
                                            placeholder="Company Description"
                                            value={
                                                profileData?.company
                                                    ?.description || ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    company: {
                                                        ...(prev.company || {}),
                                                        description:
                                                            e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                        <input
                                            type="url"
                                            placeholder="Company Website (e.g., company.com)"
                                            value={
                                                profileData?.company?.website ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    company: {
                                                        ...(prev.company || {}),
                                                        website: e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            styles["company-details-info"]
                                        }
                                    >
                                        {profileData?.designation && (
                                            <h4>{profileData.designation}</h4>
                                        )}
                                        <div className={styles["company-info"]}>
                                            {profileData?.company
                                                ?.description && (
                                                <p
                                                    className={
                                                        styles.description
                                                    }
                                                >
                                                    {
                                                        profileData.company
                                                            .description
                                                    }
                                                </p>
                                            )}
                                            <div
                                                className={
                                                    styles["company-links"]
                                                }
                                            >
                                                {profileData?.company
                                                    ?.website && (
                                                    <a
                                                        href={
                                                            profileData.company.website.startsWith(
                                                                "http"
                                                            )
                                                                ? profileData
                                                                      .company
                                                                      .website
                                                                : `https://${profileData.company.website}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className="fas fa-globe"></i>{" "}
                                                        {profileData.company
                                                            .name ||
                                                            "Company Website"}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`${styles.section} ${styles.contact}`}
                            >
                                <h3>Contact Information</h3>
                                {isEditing ? (
                                    <div
                                        className={
                                            styles["contact-location-input"]
                                        }
                                    >
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={
                                                profileData?.phoneNumber || ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    phoneNumber: e.target.value,
                                                }))
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Location"
                                            value={profileData?.location || ""}
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    location: e.target.value,
                                                }))
                                            }
                                        />
                                        <input
                                            type="url"
                                            placeholder="LinkedIn Profile URL"
                                            value={
                                                profileData?.linkedinProfile ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    linkedinProfile:
                                                        e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            styles["contact-location-info"]
                                        }
                                    >
                                        {profileData?.phoneNumber && (
                                            <p>{profileData.phoneNumber}</p>
                                        )}
                                        {profileData?.location && (
                                            <p>{profileData.location}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
