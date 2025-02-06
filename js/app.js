import { initializeAI } from './ai.js';
import { setupDesigner } from './designer.js';
import { initScene } from './three-scene.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

async function initializeApp() {
  // Initialize AI system
  await initializeAI();
  
  // Setup 3D preview
  const previewContainer = document.getElementById('preview3d');
  initScene(previewContainer);
  
  // Setup room designer
  const designerContainer = document.getElementById('designerApp');
  setupDesigner(designerContainer);
  
  // Setup event listeners
  setupEventListeners();
}

function setupEventListeners() {
  const uploadBtn = document.getElementById('uploadBtn');
  const chooseRoomBtn = document.getElementById('chooseRoomBtn');
  
  uploadBtn.addEventListener('click', handleImageUpload);
  chooseRoomBtn.addEventListener('click', handleRoomSelection);
  
  // Mobile menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

function handleImageUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadAndProcessImage(file);
        // Process the image with AI
        const designSuggestions = await generateDesignSuggestions(imageUrl);
        displayResults(designSuggestions);
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Помилка обробки зображення. Спробуйте ще раз.');
      }
    }
  };
  
  input.click();
}

function handleRoomSelection() {
  // Implementation for room type selection
  console.log('Room selection clicked');
}

function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

async function uploadAndProcessImage(file) {
  // Implementation for image upload
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

async function generateDesignSuggestions(imageUrl) {
  // AI processing implementation
  return await fetch('/api/ai_completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `Generate interior design suggestions for the uploaded room image.
      
      interface DesignSuggestion {
        style: string;
        colorScheme: string[];
        furniture: string[];
        recommendations: string[];
      }
      
      {
        "style": "Скандинавський",
        "colorScheme": ["#FFFFFF", "#F5F5F5", "#000000"],
        "furniture": ["Диван IKEA KIVIK", "Журнальний столик Oslo"],
        "recommendations": [
          "Додайте більше природного світла",
          "Використовуйте світлі відтінки для візуального розширення простору"
        ]
      }
      `,
      data: imageUrl
    })
  }).then(res => res.json());
}

function displayResults(suggestions) {
  // Implementation for displaying AI suggestions
  console.log('Design suggestions:', suggestions);
}