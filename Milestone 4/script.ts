// Get references to the form, output elements, and buttons
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLElement;
const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
const profilePictureOutput = document.getElementById('profile-picture-output') as HTMLElement;
const editButton = document.getElementById('edit-btn') as HTMLButtonElement;
const saveButton = document.getElementById('save-btn') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Personal Information
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const fatherName = (document.getElementById('father-name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLTextAreaElement).value;

    // Education Information
    const school = (document.getElementById('school') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const year = (document.getElementById('year') as HTMLInputElement).value;

    // Experience Information
    const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const years = (document.getElementById('years') as HTMLInputElement).value;

    // Skills
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    // Handle profile picture
    let profilePicUrl = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        profilePicUrl = URL.createObjectURL(profilePictureInput.files[0]);
    }

    // Populate resume output with data
    populateResumeOutput({
        name,
        fatherName,
        email,
        contact,
        address,
        school,
        degree,
        year,
        jobTitle,
        company,
        years,
        skills,
        profilePicUrl
    });

    // Show the resume and buttons
    resumeOutput.style.display = 'block';
    editButton.style.display = 'inline-block';
    form.style.display = 'none'; // Hide the form
});

// Function to populate resume output with data
function populateResumeOutput(resumeData: any) {
    const {
        name,
        fatherName,
        email,
        contact,
        address,
        school,
        degree,
        year,
        jobTitle,
        company,
        years,
        skills,
        profilePicUrl
    } = resumeData;

    // Update profile picture if available
    if (profilePicUrl) {
        const imgElement = document.createElement('img');
        imgElement.src = profilePicUrl;
        imgElement.alt = 'Profile Picture';
        imgElement.style.width = '150px';
        imgElement.style.height = '150px';
        imgElement.style.borderRadius = '50%';
        profilePictureOutput.innerHTML = '';
        profilePictureOutput.appendChild(imgElement);
    }

    // Populate personal information
    (document.getElementById('output-name') as HTMLElement).textContent = name;
    (document.getElementById('output-father-name') as HTMLElement).textContent = `Father's Name: ${fatherName}`;
    (document.getElementById('output-email') as HTMLElement).textContent = `Email: ${email}`;
    (document.getElementById('output-contact') as HTMLElement).textContent = `Contact: ${contact}`;
    (document.getElementById('output-address') as HTMLElement).textContent = `Address: ${address}`;

    // Populate education information
    (document.getElementById('output-school') as HTMLElement).textContent = `School/College: ${school}`;
    (document.getElementById('output-degree') as HTMLElement).textContent = `Degree/Qualification: ${degree}`;
    (document.getElementById('output-year') as HTMLElement).textContent = `Year of Passing: ${year}`;

    // Populate experience information
    (document.getElementById('output-job-title') as HTMLElement).textContent = `Job Title: ${jobTitle}`;
    (document.getElementById('output-company') as HTMLElement).textContent = `Company: ${company}`;
    (document.getElementById('output-years') as HTMLElement).textContent = `Years of Experience: ${years}`;

    // Populate skills
    const skillsContainer = document.getElementById('output-skills') as HTMLElement;
    skillsContainer.innerHTML = '';
    skills.forEach((skill: string) => {
        const skillBadge = document.createElement('span');
        skillBadge.classList.add('skill-badge');
        skillBadge.textContent = skill.trim();
        skillsContainer.appendChild(skillBadge);
    });
}

/// Enable editing directly on resume output
editButton.addEventListener('click', function () {
    const fields = resumeOutput.querySelectorAll('p, h1, h2'); // Select all text fields
    fields.forEach(field => {
        // Type assertion to cast the field as HTMLElement
        const editableField = field as HTMLElement;
        editableField.setAttribute('contenteditable', 'true');
        editableField.style.border = '1px solid #ccc'; // Add border to indicate edit mode
        editableField.style.padding = '5px';
    });

    // Allow the user to change the profile picture during edit mode
    const changeProfilePicButton = document.createElement('button');
    changeProfilePicButton.textContent = 'Change Profile Picture';
    changeProfilePicButton.addEventListener('click', () => {
        profilePictureInput.click(); // Trigger file input for picture change
        profilePictureInput.addEventListener('change', () => {
            if (profilePictureInput.files && profilePictureInput.files[0]) {
                const newProfilePicUrl = URL.createObjectURL(profilePictureInput.files[0]);
                const imgElement = profilePictureOutput.querySelector('img') as HTMLImageElement;
                imgElement.src = newProfilePicUrl; // Update the displayed profile picture
            }
        });
    });
    profilePictureOutput.appendChild(changeProfilePicButton);

    // Allow the user to add new skills
    const addSkillButton = document.createElement('button');
    addSkillButton.textContent = 'Add Skill';
    addSkillButton.addEventListener('click', () => {
        const newSkill = prompt('Enter a new skill:');
        if (newSkill) {
            const skillBadge = document.createElement('span');
            skillBadge.classList.add('skill-badge');
            skillBadge.textContent = newSkill.trim();
            const skillsContainer = document.getElementById('output-skills') as HTMLElement;
            skillsContainer.appendChild(skillBadge);
        }
    });
    document.getElementById('output-skills')?.appendChild(addSkillButton);

    saveButton.style.display = 'inline-block';
    editButton.style.display = 'none'; // Hide the edit button
});

// Save updated resume and lock fields
saveButton.addEventListener('click', function () {
    const fields = resumeOutput.querySelectorAll('p, h1, h2'); // Select all text fields
    fields.forEach(field => {
        // Type assertion to cast the field as HTMLElement
        const editableField = field as HTMLElement;
        editableField.removeAttribute('contenteditable');
        editableField.style.border = 'none'; // Remove border after saving
        editableField.style.padding = '0';
    });

    // Hide the buttons for changing picture and adding skills after save
    const changeProfilePicButton = profilePictureOutput.querySelector('button');
    if (changeProfilePicButton) changeProfilePicButton.remove();

    const addSkillButton = document.getElementById('output-skills')?.querySelector('button');
    if (addSkillButton) addSkillButton.remove();

    saveButton.style.display = 'none'; // Hide the save button
    editButton.style.display = 'inline-block'; // Show the edit button
});
