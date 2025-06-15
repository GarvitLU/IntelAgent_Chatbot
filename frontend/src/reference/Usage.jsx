import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stepper, { Step } from "./Stepper";
import CompletionMessage from "./CompletionMessage";
import axios from "axios";

const Usage = () => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        console.log(e.target.value);
        const { name, value, type, checked, files } = e.target;

        // Handle checkbox inputs differently
        if (type === "checkbox") {
            const jobType = e.target.nextElementSibling.textContent;
            setFormData((prev) => {
                const currentJobTypes = prev.jobTypes || [];
                let updatedJobTypes;

                if (checked) {
                    // Add the job type if checked
                    updatedJobTypes = [...currentJobTypes, jobType];
                } else {
                    // Remove the job type if unchecked
                    updatedJobTypes = currentJobTypes.filter(
                        (type) => type !== jobType
                    );
                }

                return {
                    ...prev,
                    jobTypes: updatedJobTypes,
                };
            });
        } else {
            // Handle other input types
            setFormData((prev) => ({
                ...prev,
                [name]: type === "file" ? files[0] : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        const formDataObject = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "resume" && formData[key]) {
                formDataObject.append(
                    "resume",
                    formData[key],
                    formData[key].name
                );
            } else {
                formDataObject.append(key, formData[key]);
            }
        });

        axios
            .post("http://localhost:3000/create", formDataObject, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("Form submitted successfully:", response.data);
                setIsCompleted(true);
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
            });
    };

    return (
        <AnimatePresence mode="wait">
            {isCompleted ? (
                <CompletionMessage />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{ width: "100%", maxWidth: "800px" }}
                >
                    <Stepper
                        initialStep={1}
                        onStepChange={(step) => {
                            console.log(step);
                        }}
                        onFinalStepCompleted={() => {
                            console.log("Form submitted:", formData);
                            setIsCompleted(true);
                        }}
                        backButtonText="Previous"
                        nextButtonText="Next"
                    >
                        <Step>
                            <h2>Basic Information</h2>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="currentTitle"
                                    value={formData.currentTitle}
                                    onChange={handleInputChange}
                                    placeholder="Current Job Title/Position"
                                    required
                                />
                                <input
                                    type="text"
                                    name="desiredTitle"
                                    value={formData.desiredTitle}
                                    onChange={handleInputChange}
                                    placeholder="Desired Job Title/Position"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                        </Step>

                        <Step>
                            <h2>Experience & Preferences</h2>
                            <div className="input-group">
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="select-field"
                                    required
                                >
                                    <option value="">
                                        Select Work Experience
                                    </option>
                                    <option value="fresher">
                                        Fresher (0-1 years)
                                    </option>
                                    <option value="junior">
                                        Junior (1-3 years)
                                    </option>
                                    <option value="mid">
                                        Mid-Level (3-5 years)
                                    </option>
                                    <option value="senior">
                                        Senior (5+ years)
                                    </option>
                                </select>

                                <div className="checkbox-group">
                                    <p className="checkbox-label">
                                        What type of jobs are you interested in?
                                    </p>
                                    <div className="checkbox-options">
                                        {[
                                            "Full-time",
                                            "Part-time",
                                            "Internship",
                                            "Freelance",
                                        ].map((type) => (
                                            <label
                                                key={type}
                                                className="checkbox-item"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name={type}
                                                    checked={(
                                                        formData.jobTypes || []
                                                    ).includes(type)}
                                                    onChange={handleInputChange}
                                                />
                                                <span>{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Step>

                        <Step>
                            <h2>Skills & Resume</h2>
                            <div className="input-group">
                                <div className="file-upload">
                                    <label className="file-label">
                                        <input
                                            type="file"
                                            name="resume"
                                            onChange={handleInputChange}
                                            accept=".pdf,.doc,.docx"
                                            className="file-input"
                                        />
                                        <span className="file-button">
                                            {formData.resume
                                                ? formData.resume.name
                                                : "Upload Resume/CV"}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </Step>

                        <Step>
                            <h2>Review Your Information</h2>
                            <div className="review-content">
                                <p>
                                    <strong>Current Title:</strong>{" "}
                                    {formData.currentTitle}
                                </p>
                                <p>
                                    <strong>Desired Title:</strong>{" "}
                                    {formData.desiredTitle}
                                </p>
                                <p>
                                    <strong>Email:</strong> {formData.email}
                                </p>
                                <p>
                                    <strong>Experience:</strong>{" "}
                                    {formData.experience}
                                </p>
                                <p>
                                    <strong>Job Types:</strong>{" "}
                                    {(formData.jobTypes || []).join(", ") ||
                                        "None selected"}
                                </p>
                                <p>
                                    <strong>Resume:</strong>{" "}
                                    {formData.resume?.name || "Not uploaded"}
                                </p>
                            </div>
                        </Step>
                    </Stepper>
                </form>
            )}
        </AnimatePresence>
    );
};

export default Usage;
