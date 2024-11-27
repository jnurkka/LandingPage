function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

// Render functions
function renderProject(project) {
  return `
    <div class="project">
      <span class="date">${project.date}</span>
      <h2 class="title">${project.title}</h2>
      <div class="project-content">
        <p class="body">${project.summary}</p>
        ${project.details ? `
          <div class="expanded-content">
            <p class="body">${project.details}</p>
          </div>
        ` : ''}
      </div>
      <div class="project-footer">
        ${project.link ? `<a href="${project.link.url}">${project.link.text}</a>` : ''}
        <button class="read-more">Read more</button>
      </div>
    </div>
  `;
}

function renderSection(items, sectionTitle) {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>${sectionTitle}.</h1>
    <div id="work">
      ${items.map(item => renderProject(item)).join('')}
    </div>
  `;
  return container;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  const main = document.getElementById('main');

  // Clear existing content
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  // Render new content
  main.appendChild(renderSection(content.projects, 'Projects'));
  main.appendChild(renderSection(content.education, 'Education'));

  // Add contact section
  main.innerHTML += `
    <h1>Contact.</h1>
    <div id="contact" class="content">
      <div id="icons">
        <span class="socialicon"><a href="https://www.linkedin.com/in/jnurkka" aria-label="Check out my profile on LinkedIn"><i class="fab fa-linkedin"></i></a></span>
        <span class="socialicon"><a href="https://www.instagram.com/jaakkonurkka" aria-label="Check out my profile on Instagram"><i class="fab fa-instagram"></i></a></span>
        <span class="socialicon"><a href="https://www.facebook.com/jaakko.nurkka" aria-label="Check out my profile on Facebook"><i class="fab fa-facebook-square"></i></a></span>
        <span class="socialicon"><a href="#" aria-label="Write me an email" class="cryptedmail" data-name="jaakko" data-domain="nurkka" data-tld="me" onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;"><i class="fas fa-envelope"></i></a></span>
      </div>
    </div>
  `;

  // Initialize expand/collapse functionality
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    const expandedContent = project.querySelector('.expanded-content');
    const readMoreButton = project.querySelector('.read-more');

    if (!expandedContent || !expandedContent.textContent.trim()) {
      readMoreButton.style.display = 'none';
    }

    if (readMoreButton) {
      readMoreButton.addEventListener('click', function() {
        const project = this.closest('.project');
        project.classList.toggle('expanded');

        if (project.classList.contains('expanded')) {
          this.textContent = 'Show less';
        } else {
          this.textContent = 'Read more';
        }
      });
    }

    // Add mousemove handler for glow effect
    let glowX = 0;
    let glowY = 0;
    let rafId = null;

    function updateGlow() {
      if (!project.classList.contains('glowing')) return;

      const targetX = parseFloat(project.getAttribute('data-target-x') || 0);
      const targetY = parseFloat(project.getAttribute('data-target-y') || 0);

      // Smooth interpolation
      glowX += (targetX - glowX) * 0.1;
      glowY += (targetY - glowY) * 0.1;

      project.style.setProperty('--glow-x', `${glowX}px`);
      project.style.setProperty('--glow-y', `${glowY}px`);

      rafId = requestAnimationFrame(updateGlow);
    }

    project.addEventListener('mousemove', (e) => {
      const rect = project.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      project.classList.add('glowing');
      project.setAttribute('data-target-x', x);
      project.setAttribute('data-target-y', y);

      if (!rafId) {
        rafId = requestAnimationFrame(updateGlow);
      }
    });

    // Add mouseout handler to remove glow
    project.addEventListener('mouseleave', () => {
      project.classList.remove('glowing');
      project.style.setProperty('--glow-opacity', '0');
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
  });
});

// Scroll handler
window.onscroll = function() {
  if (window.pageYOffset <= vh(2)) {
    document.getElementById("sticky-heading").style.top = "8vmax";
    document.getElementById("greeting").innerText = "Moi, I'm Jaakko 👋";
    document.getElementById("job-title").style.top = "14vmax";
    document.getElementById("job-title").style.opacity = "100%";
  } else {
    document.getElementById("sticky-heading").style.top = "2vmax";
    document.getElementById("greeting").innerText = "Jaakko Nurkka";
    document.getElementById("job-title").style.top = "0";
    document.getElementById("job-title").style.opacity = "0%";
  }
}