const projects = [
  {
    id: 1,
    title: 'Adaptive Road Safety System',
    category: 'Embedded Systems',
    categoryKey: 'embedded',
    image: './Screenshot%202026-09-28%20214712.png',
    github: 'https://github.com/lahari-yaddala/Smart-Vehicle-Safety-System-Arduino',
    demoVideo: 'https://drive.google.com/file/d/1-0xvMZoXLInotnsIcZpr33CZMcLKTpZk/view?usp=sharing',
    description:
      'A smart road-safety solution built to detect risky driving patterns and reduce collision chances through sensor-based awareness and real-time response mechanisms.',
    tags: ['Embedded C', 'Sensors', 'Safety', 'IoT'],
  },
  {
    id: 2,
    title: 'Smart Waste Management System',
    category: 'Embedded Systems',
    categoryKey: 'embedded',
    image: './Screenshot%202026-09-28%20214841.png',
    github: 'https://github.com/lahari-yaddala/Smart-waste-management-system/tree/main',
    description:
      'An intelligent waste monitoring platform that tracks bin fill levels and optimizes collection schedules to improve city hygiene and operational efficiency.',
    tags: ['Microcontroller', 'Automation', 'Urban Tech', 'Monitoring'],
  },
  {
    id: 3,
    title: 'PIC-Based Washing Machine Simulation',
    category: 'Embedded Systems',
    categoryKey: 'embedded',
    image: './Screenshot%202026-09-28%20215335.png',
    demoVideo: 'https://youtu.be/xPhLk2YhhyY',
    description:
      'A simulation of a washing machine control system using PIC microcontrollers to handle operational states, timing, and user interaction in a realistic embedded workflow.',
    tags: ['PIC', 'Simulation', 'Firmware', 'Timing'],
  },
  {
    id: 4,
    title: 'DC Motor Speed Control Using PID Controller',
    category: 'Embedded Systems',
    categoryKey: 'embedded',
    image: './Screenshot%202026-09-28%20221716.png',
    description:
      'A precise speed-control system designed for DC motors using a PID algorithm to maintain stable output under varying load conditions and disturbances.',
    tags: ['PID Control', 'Motor Drive', 'Feedback', 'Control Systems'],
  },
  {
    id: 5,
    title: 'Contactless Vital Sign Detection Using FMCW Radar and CNN',
    category: 'Radar & Signal Processing',
    categoryKey: 'radar',
    image: './Screenshot%202026-09-28%20221453.png',
    github: 'https://github.com/lahari-yaddala/Non-contact-based-vital-sign-monitoring-using-FMCW-radar',
    description:
      'A non-contact health monitoring project combining FMCW radar signal analysis and deep learning to estimate vital signs from motion and physiological changes.',
    tags: ['Radar', 'CNN', 'Signal Processing', 'Healthcare AI'],
  },
  {
    id: 6,
    title: '8-Bit ALU Using Four-Stage Pipelining',
    category: 'VLSI & Digital Design',
    categoryKey: 'vlsi',
    image: './Screenshot%202026-09-28%20215419.png',
    github: 'https://github.com/lahari-yaddala/-8-Bit-ALU-Using-4-Stage-Pipelining',
    description:
      'A high-performance 8-bit arithmetic logic unit implemented with a four-stage pipeline to improve throughput and support efficient digital computation.',
    tags: ['Verilog', 'VLSI', 'Pipeline', 'RTL'],
  },
];

const projectGrid = document.getElementById('project-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalMeta = document.getElementById('modal-meta');

function renderProjects(filter = 'all') {
  projectGrid.innerHTML = '';

  const visibleProjects = filter === 'all'
    ? projects
    : projects.filter((project) => project.categoryKey === filter);

  visibleProjects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const imageMarkup = project.image
      ? `
        <div class="project-image-wrap">
          <img src="${project.image}" alt="${project.title}" class="project-image" />
        </div>
      `
      : '';

    card.innerHTML = `
      <div class="card-top">
        <span class="category-tag">${project.category}</span>
        <span class="card-number">0${project.id}</span>
      </div>
      ${imageMarkup}
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="card-tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
      </div>
      <div class="card-actions">
        <button class="view-btn" type="button" data-project-id="${project.id}">View Project</button>
      </div>
    `;

    if (project.id === 1) {
      card.classList.add('featured-project');
    }

    projectGrid.appendChild(card);
  });

  bindProjectButtons();
}

function bindProjectButtons() {
  const buttons = document.querySelectorAll('.view-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = Number(button.dataset.projectId);
      const project = projects.find((item) => item.id === targetId);
      if (!project) return;

      modalTitle.textContent = project.title;
      modalCategory.textContent = project.category;
      modalDescription.textContent = project.description;

      const links = [];
      if (project.github) {
        links.push(`<a href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>`);
      }
      if (project.demoVideo) {
        links.push(`<a href="${project.demoVideo}" target="_blank" rel="noreferrer">Demo Video</a>`);
      }

      modalMeta.innerHTML = [
        ...project.tags.map((tag) => `<span>${tag}</span>`),
        ...(links.length ? [`<span class="link-badge">${links.join('')}</span>`] : [])
      ].join('');

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
}

function setFilter(filter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  renderProjects(filter);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setFilter(button.dataset.filter);
  });
});

modal.addEventListener('click', (event) => {
  if (event.target.matches('[data-close="modal"]') || event.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

document.querySelector('.modal-close').addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

renderProjects();
