// Smooth Scroll Navigation (optional)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Certificate Modal Logic
// Certificate Modal Logic
const modalContainer = document.createElement('div');
modalContainer.className = 'modal';
modalContainer.innerHTML = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <img id="modal-img" src="" alt="Certificate Image" />
    <div class="modal-controls">
      <button id="prev-btn">&lt;</button>
      <button id="next-btn">&gt;</button>
    </div>
  </div>
`;
document.body.appendChild(modalContainer);

let certImages = [];
let currentIndex = 0;

const modal = document.querySelector(".modal");
const modalImg = modal.querySelector("#modal-img");
const prevBtn = modal.querySelector("#prev-btn");
const nextBtn = modal.querySelector("#next-btn");
const closeBtn = modal.querySelector(".close-btn");
const modalControls = modal.querySelector('.modal-controls');

// Open modal with certificate images
function openModal(images = [], pdf) {
  if (images.length === 0) return;
  certImages = images;
  currentIndex = 0;
  modalImg.src = images[0];

  // Show arrows only if there are multiple images
  if (images.length > 1) {
    modalControls.style.display = "flex";
  } else {
    modalControls.style.display = "none";
  }

  // Remove any existing PDF button
  modal.querySelector('.view-pdf-btn')?.remove();
  if (pdf) {
    const viewPdfBtn = document.createElement('a');
    viewPdfBtn.href = pdf;
    viewPdfBtn.target = '_blank';
    viewPdfBtn.textContent = "View PDF";
    viewPdfBtn.className = "view-pdf-btn";
    modal.querySelector('.modal-content').appendChild(viewPdfBtn);
  }

  modal.style.display = "flex";
}


// Close modal
function closeModal() {
  modal.style.display = "none";
  certImages = [];
  currentIndex = 0;
  modal.querySelector('.view-pdf-btn')?.remove(); // Remove PDF button to prevent stacking
}

function showImage(index) {
  if (certImages.length > 0) modalImg.src = certImages[index];
}

// Event delegation for certificate thumbnail clicks
document.querySelectorAll('.certificate').forEach(cert => {
  cert.addEventListener('click', () => {
    const imgList = cert.getAttribute('data-imgs');
    const pdf = cert.getAttribute('data-pdf');
    if (imgList) {
      const imgs = imgList.split(',').map(src => src.trim());
      openModal(imgs, pdf);
    }
  });
});

// Modal button controls
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + certImages.length) % certImages.length;
  modalImg.src = certImages[currentIndex];
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % certImages.length;
  modalImg.src = certImages[currentIndex];
});
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
  modal.querySelector('.view-pdf-btn')?.remove();
});
modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modal.querySelector('.view-pdf-btn')?.remove();
  }
});
