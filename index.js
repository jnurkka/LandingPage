function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

// Render functions
function renderProject(project) {
  return `
    <div class="project glow-container">
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

// Glow effect handler
function initializeGlowEffect(element) {
  let glowX = 0;
  let glowY = 0;
  let rafId = null;

  function updateGlow() {
    if (!element.matches(':hover')) return;

    const targetX = parseFloat(element.getAttribute('data-target-x') || 0);
    const targetY = parseFloat(element.getAttribute('data-target-y') || 0);

    glowX += (targetX - glowX) * 0.1;
    glowY += (targetY - glowY) * 0.1;

    element.style.setProperty('--glow-x', `${glowX}px`);
    element.style.setProperty('--glow-y', `${glowY}px`);

    rafId = requestAnimationFrame(updateGlow);
  }

  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    element.classList.add('glowing');
    element.setAttribute('data-target-x', x);
    element.setAttribute('data-target-y', y);

    if (!rafId) {
      rafId = requestAnimationFrame(updateGlow);
    }
  });

  element.addEventListener('mouseleave', () => {
    element.classList.remove('glowing');
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });
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
        this.textContent = project.classList.contains('expanded') ? 'Show less' : 'Read more';
      });
    }

    // Initialize glow effect
    initializeGlowEffect(project);
  });

  // Initialize back to top button
  const backToTop = document.getElementById('back-to-top');
  initializeGlowEffect(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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

  const backToTop = document.getElementById('back-to-top');
  const isAtBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 100;

  if (window.pageYOffset <= window.innerHeight) {
    backToTop.classList.remove('visible');
    backToTop.classList.remove('expanded');
  } else {
    backToTop.classList.add('visible');
    if (isAtBottom) {
      backToTop.classList.add('expanded');
    } else {
      backToTop.classList.remove('expanded');
    }
  }
}