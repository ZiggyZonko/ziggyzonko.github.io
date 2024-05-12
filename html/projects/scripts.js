let currentProjectIndex = -1;
const projectsContainer = document.getElementById('projects');
const nextBtn = document.getElementById('nextBtn');

async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/ziggyzonko/repos');
        const projects = await response.json();
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';
            
            const projectTitle = document.createElement('div');
            projectTitle.className = 'project-title';
            projectTitle.textContent = project.name;
            projectDiv.appendChild(projectTitle);

            const projectDescription = document.createElement('p');
            projectDescription.className = 'project-description';
            projectDescription.textContent = project.description || 'No description available.';
            projectDiv.appendChild(projectDescription);

            const iconsContainer = document.createElement('div');
            iconsContainer.className = 'icons-container';
            projectDiv.appendChild(iconsContainer);

            if (project.language) {
                const languageIcon = document.createElement('i');
                languageIcon.className = `devicon-${project.language.toLowerCase()}-plain`; // Using Devicon class naming
                iconsContainer.appendChild(languageIcon);
            }

            const githubLink = document.createElement('a');
            githubLink.href = project.html_url;
            githubLink.className = 'github-icon';
            githubLink.setAttribute('aria-label', 'GitHub repository link');
            githubLink.innerHTML = '<i class="fab fa-github"></i>';
            iconsContainer.appendChild(githubLink);

            projectsContainer.appendChild(projectDiv);
        });
        scrollToNextProject(); // Automatically scroll to the first project
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        projectsContainer.textContent = 'Failed to load projects.';
    }
}

function scrollToNextProject() {
    const projects = document.querySelectorAll('.project');
    if (currentProjectIndex < projects.length - 1) {
        currentProjectIndex++;
        const nextProject = projects[currentProjectIndex];
        nextProject.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

nextBtn.addEventListener('click', scrollToNextProject);

fetchGitHubProjects();
