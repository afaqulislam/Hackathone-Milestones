// Get references to the form, output elements, and buttons
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLElement;
const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
const profilePictureOutput = document.getElementById('profile-picture-output') as HTMLElement;

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

    // Show the resume output section
    resumeOutput.style.display = 'block';
}
