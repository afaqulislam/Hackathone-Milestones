"use strict";
// Get references to the form, output elements, and buttons
const form = document.getElementById('resume-form');
const resumeOutput = document.getElementById('resume-output');
const profilePictureInput = document.getElementById('profile-picture');
const profilePictureOutput = document.getElementById('profile-picture-output');
const saveButton = document.getElementById('save-btn');
const downloadButton = document.getElementById('download-btn');
const shareButton = document.getElementById('share-btn');
const resumeLink = document.getElementById('resume-link');
// Variable to store the generated resume URL
let generatedUrl = '';
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    // Personal Information
    const name = document.getElementById('name').value;
    const fatherName = document.getElementById('father-name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const address = document.getElementById('address').value;
    // Education Information
    const school = document.getElementById('school').value;
    const degree = document.getElementById('degree').value;
    const year = document.getElementById('year').value;
    // Experience Information
    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const years = document.getElementById('years').value;
    // Skills
    const skills = document.getElementById('skills').value.split(',');
    // Handle profile picture
    let profilePicUrl = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        profilePicUrl = URL.createObjectURL(profilePictureInput.files[0]);
    }
    // Generate a unique URL (this is a simulated URL for demonstration purposes)
    const username = document.getElementById('name').value.toLowerCase().replace(/[^a-z0-9]/g, '');
    generatedUrl = `https://${username}.vercel.app/resume`; // Store the generated URL
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
    // Show the resume output section
    resumeOutput.style.display = 'block';
    form.style.display = 'none'; // Hide the form
    resumeLink.style.display = 'none'; // Hide the link initially
});
// Function to populate resume output with data
function populateResumeOutput(resumeData) {
    const { name, fatherName, email, contact, address, school, degree, year, jobTitle, company, years, skills, profilePicUrl } = resumeData;
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
    document.getElementById('output-name').textContent = name;
    document.getElementById('output-father-name').textContent = `Father's Name: ${fatherName}`;
    document.getElementById('output-email').textContent = `Email: ${email}`;
    document.getElementById('output-contact').textContent = `Contact: ${contact}`;
    document.getElementById('output-address').textContent = `Address: ${address}`;
    // Populate education information
    document.getElementById('output-school').textContent = `School/College: ${school}`;
    document.getElementById('output-degree').textContent = `Degree/Qualification: ${degree}`;
    document.getElementById('output-year').textContent = `Year of Passing: ${year}`;
    // Populate experience information
    document.getElementById('output-job-title').textContent = `Job Title: ${jobTitle}`;
    document.getElementById('output-company').textContent = `Company: ${company}`;
    document.getElementById('output-years').textContent = `Years of Experience: ${years}`;
    // Populate skills
    const skillsContainer = document.getElementById('output-skills');
    skillsContainer.innerHTML = '';
    skills.forEach((skill) => {
        const skillBadge = document.createElement('span');
        skillBadge.classList.add('skill-badge');
        skillBadge.textContent = skill.trim();
        skillsContainer.appendChild(skillBadge);
    });
}
// Handle download button click
downloadButton.addEventListener('click', () => {
    const resumeElement = document.getElementById('resume-output');
    const options = {
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeElement).set(options).save();
});
// Handle share button click
shareButton.addEventListener('click', () => {
    if (generatedUrl) { // Check if a URL has been generated
        if (navigator.share) {
            navigator.share({
                title: 'My Resume',
                url: generatedUrl
            }).catch(console.error);
        }
        else {
            prompt('Copy this URL to share:', generatedUrl);
        }
    }
    else {
        alert('No resume has been generated to share.');
    }
});
