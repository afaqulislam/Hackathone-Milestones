const button = document.getElementById('toggle-skills') as HTMLButtonElement;
const skillsSection = document.getElementById('skills') as HTMLElement;

button.addEventListener('click', () => {
    skillsSection.style.display = skillsSection.style.display === 'none' ? 'block' : 'none';
});
