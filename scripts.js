document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true
  });

  // Initialize Particles.js
  if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
          speed: 3,
          direction: "none",
          random: true
        }
      }
    });
  }

  // Hero Slider
  let currentSlide = 0; // Start with the first slide (index 0)
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');

  if (slides.length > 0 && dots.length > 0) {
    // Function to show a specific slide
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    // Function to move to the next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // Initialize the first slide as active
    showSlide(currentSlide);

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  // Tab Functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(target)?.classList.add('active');
      });
    });
  }

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Stats Counter
  const stats = document.querySelectorAll('.stat-number');

  if (stats.length > 0) {
    stats.forEach(stat => {
      const targetValue = stat.getAttribute('data-target');
      if (!targetValue) return;

      const target = parseInt(targetValue);
      const increment = target / 100;

      function updateCount() {
        const count = parseInt(stat.innerText || '0');
        if (count < target) {
          stat.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          stat.innerText = target;
        }
      }

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.unobserve(entries[0].target);
        }
      });

      observer.observe(stat);
    });
  }

  // Dark Mode Toggle
  const themeToggle = document.querySelector('.theme-toggle');

  if (themeToggle) {
    const icon = themeToggle.querySelector('i');

    if (icon) {
      // Check for saved theme preference
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
      }

      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
          icon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('theme', 'dark');
        } else {
          icon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize gallery filter functionality
  if (typeof initGalleryFilter === 'function') {
    initGalleryFilter();
  }

  // Initialize lightbox modal functionality
  if (typeof initLightboxModal === 'function') {
    initLightboxModal();
  }

  // Initialize search feature
  if (typeof initSearchFeature === 'function') {
    initSearchFeature();
  }
});

// Initialize facilities.html gallery sections
document.querySelectorAll('.gallery-wrapper').forEach(gallery => {
  const scrollContent = gallery.querySelector('.scroll-content');
  const scrollItems = gallery.querySelectorAll('.scroll-item');
  const prevBtn = gallery.querySelector('.prev');
  const nextBtn = gallery.querySelector('.next');
  const scrollProgress = gallery.querySelector('.scroll-progress');

  if (!scrollContent || !scrollItems.length || !prevBtn || !nextBtn || !scrollProgress) {
    console.error('Missing required elements in gallery');
    return;
  }

  // Create progress dots
  scrollItems.forEach(() => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    scrollProgress.appendChild(dot);
  });

  const progressDots = scrollProgress.querySelectorAll('.progress-dot');

  // Initialize first dot as active
  if (progressDots.length > 0) {
    progressDots[0].classList.add('active');
  }

  // Get scroll distance dynamically (item width + gap)
  // Default: 300px (item) + 32px (2rem gap) = 332px
  const getScrollDistance = () => {
    const firstItem = scrollItems[0];
    if (!firstItem) return 332;
    const itemWidth = firstItem.offsetWidth;
    // Get computed gap from scroll-content
    const computedStyle = window.getComputedStyle(scrollContent);
    const gap = parseFloat(computedStyle.gap) || 32;
    return itemWidth + gap;
  };

  const scrollDistance = getScrollDistance();

  // Scroll buttons functionality
  prevBtn.addEventListener('click', () => {
    scrollContent.scrollBy({
      left: -scrollDistance,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    scrollContent.scrollBy({
      left: scrollDistance,
      behavior: 'smooth'
    });
  });


  // Update progress dots on scroll
  const updateProgress = () => {
    const scrollPosition = scrollContent.scrollLeft;
    const maxScroll = scrollContent.scrollWidth - scrollContent.clientWidth;
    const scrollPercentage = maxScroll > 0 ? scrollPosition / maxScroll : 0;
    const itemCount = scrollItems.length;
    const activeIndex = Math.round(scrollPercentage * (itemCount - 1));

    progressDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  };

  scrollContent.addEventListener('scroll', updateProgress);

  // Touch scroll functionality
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContent.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContent.style.cursor = 'grabbing';
    startX = e.pageX - scrollContent.offsetLeft;
    scrollLeft = scrollContent.scrollLeft;
  });

  scrollContent.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContent.style.cursor = 'grab';
  });

  scrollContent.addEventListener('mouseup', () => {
    isDown = false;
    scrollContent.style.cursor = 'grab';
  });

  scrollContent.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContent.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContent.scrollLeft = scrollLeft - walk;
  });
});

/* Contact Form Submission */
const form = document.getElementById('form');
const result = document.getElementById('result');
const submitBtn = form?.querySelector('.submit-button');

if (form && result && submitBtn) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Show loading message
    result.className = 'loading fade-in';
    result.textContent = "Please wait...";

    try {
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const data = await response.json();

      if (response.status === 200) {
        result.className = 'success fade-in';
        result.textContent = "Message sent successfully!";
        form.reset();
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      result.className = 'error fade-in';
      result.textContent = error.message;
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';

      // Hide result after 3 seconds
      setTimeout(() => {
        result.style.opacity = '0';
        setTimeout(() => {
          result.textContent = '';
          result.className = '';
          result.style.opacity = '1';
        }, 300);
      }, 3000);
    }
  });
}

/**
 * Initialize gallery filter functionality with animations and counters.
 */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryGrid = document.querySelector('.gallery-grid');

  // If no gallery elements found, exit early
  if (!filterButtons.length || !galleryItems.length) return;

  // Create a counter element to show how many items are displayed
  const counterElement = document.createElement('div');
  counterElement.className = 'gallery-counter';
  counterElement.innerHTML = `<span>${galleryItems.length}</span> items displayed`;

  // Insert counter after the filter buttons
  const galleryFilters = document.querySelector('.gallery-filters');
  if (galleryFilters && galleryFilters.parentNode) {
    galleryFilters.parentNode.insertBefore(counterElement, galleryFilters.nextSibling);
  }

  // Add animation classes to gallery items
  galleryItems.forEach(item => {
    item.classList.add('filter-animation');
  });

  // Function to update the counter
  function updateCounter(count) {
    if (counterElement) {
      counterElement.innerHTML = `<span>${count}</span> item${count !== 1 ? 's' : ''} displayed`;
    }
  }

  // Function to filter gallery items with animation
  function filterGallery(filter) {
    let visibleCount = 0;

    // First mark all items for visibility
    galleryItems.forEach(item => {
      const shouldShow = filter === 'all' || item.getAttribute('data-category') === filter;

      // Add animation classes without changing layout immediately
      if (shouldShow) {
        // For items that should be shown, remove hide class first
        item.classList.remove('hide');
        // Then add show class with a slight delay to ensure smooth transition
        setTimeout(() => {
          item.classList.add('show');
        }, 10);
        visibleCount++;
      } else {
        // For items that should be hidden, remove show class first
        item.classList.remove('show');
        // Then add hide class with a slight delay
        setTimeout(() => {
          item.classList.add('hide');
        }, 10);
      }
    });

    // Update the counter
    updateCounter(visibleCount);

    // Optional: Add subtle animation to the grid without affecting layout
    if (galleryGrid) {
      setTimeout(() => {
        galleryGrid.classList.add('filtered');
        setTimeout(() => galleryGrid.classList.remove('filtered'), 300);
      }, 300);
    }
  }

  // Add click event listeners to filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      filterGallery(filter);
    });
  });

  // Initialize with "all" filter
  filterGallery('all');
}

/**
 * Initialize enhanced lightbox modal functionality with improved navigation,
 * zoom capabilities, and gallery-specific filtering.
 */
function initLightboxModal() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');
  const modalNext = document.getElementById('modalNext');
  const modalPrev = document.getElementById('modalPrev');

  if (modal && modalImg && modalCaption && modalClose) {
    // Style improvements for modal display
    modal.style.display = 'none';
    modal.style.flexDirection = 'column';

    // Create counter element
    const modalCounter = document.createElement('div');
    modalCounter.id = 'modalCounter';
    modalCounter.style.color = '#fff';
    modalCounter.style.textAlign = 'center';
    modalCounter.style.margin = '10px 0';
    modalCounter.style.fontSize = '0.9rem';
    modalCounter.style.opacity = '0.8';

    // Get the download button from HTML
    const downloadBtn = document.getElementById('downloadImg');

    // Insert counter into the modal
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
      modalContainer.appendChild(modalCounter);
    }

    // Get only gallery images instead of all images on the page
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img'));
    let currentIndex = 0;

    // If no gallery images found, exit early
    if (galleryImages.length === 0) return;

    // Open modal with the image of given index
    function openModal(index) {
      modal.style.display = 'flex';
      updateModal(index);

      // Add active class for animation
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    }

    // Update modal content based on index
    function updateModal(index) {
      const img = galleryImages[index];
      if (!img) return;

      // Set the image source directly without showing loading spinner
      modalImg.src = img.src;

      // Ensure image is displayed immediately
      modalImg.style.display = 'block';

      // Get caption from parent gallery item's overlay if available
      const parentItem = img.closest('.gallery-item');
      const overlay = parentItem ? parentItem.querySelector('.overlay') : null;
      modalCaption.innerHTML = overlay ? overlay.innerHTML : (img.alt || '');

      // Update counter
      modalCounter.textContent = `Image ${index + 1} of ${galleryImages.length}`;
    }

    // Attach click listeners only to gallery images
    galleryImages.forEach((img, index) => {
      if (!img) return;

      img.style.cursor = 'pointer';

      // Remove any existing click listeners first
      const newImg = img.cloneNode(true);
      if (img.parentNode) {
        img.parentNode.replaceChild(newImg, img);
      }

      newImg.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = index;
        openModal(currentIndex);
      });
    });

    // Enhanced navigation with animation
    if (modalNext) {
      modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        modalImg.classList.add('slide-out-left');

        setTimeout(() => {
          currentIndex = (currentIndex + 1) % galleryImages.length;
          updateModal(currentIndex);
          modalImg.classList.remove('slide-out-left');
          modalImg.classList.add('slide-in-right');

          setTimeout(() => {
            modalImg.classList.remove('slide-in-right');
          }, 300);
        }, 300);
      });
    }

    if (modalPrev) {
      modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        modalImg.classList.add('slide-out-right');

        setTimeout(() => {
          currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
          updateModal(currentIndex);
          modalImg.classList.remove('slide-out-right');
          modalImg.classList.add('slide-in-left');

          setTimeout(() => {
            modalImg.classList.remove('slide-in-left');
          }, 300);
        }, 300);
      });
    }

    // Download functionality
    // Enhanced version that prevents opening a new page
    if (downloadBtn) {
      downloadBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        e.preventDefault(); // Prevent default behavior

        try {
          const imgSrc = modalImg.src;

          // For mobile devices, we'll use fetch and blob
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Fetch the image
            const response = await fetch(imgSrc);
            const blob = await response.blob();

            // Create object URL
            const blobUrl = window.URL.createObjectURL(blob);

            // Try to use the native sharing on mobile devices first
            if (navigator.share) {
              try {
                await navigator.share({
                  files: [new File([blob], 'image.jpg', { type: blob.type })]
                });
                return;
              } catch (err) {
                console.log('Fallback to direct download');
              }
            }

            // Fallback for iOS Safari
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
              const reader = new FileReader();
              reader.onloadend = function () {
                const a = document.createElement('a');
                a.href = reader.result;
                a.download = `image-${currentIndex + 1}.jpg`;
                a.target = "_self"; // Force same page
                a.rel = "noopener noreferrer"; // Security best practice
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(blobUrl);
              };
              reader.readAsDataURL(blob);
            } else {
              // For other mobile browsers
              const a = document.createElement('a');
              a.href = blobUrl;
              a.download = `image-${currentIndex + 1}.jpg`;
              a.target = "_self"; // Force same page
              a.rel = "noopener noreferrer"; // Security best practice
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(blobUrl);
            }
          } else {
            // Desktop browsers handling
            const link = document.createElement('a');

            // Handle cross-origin images
            if (imgSrc.startsWith('http') && !imgSrc.includes(window.location.hostname)) {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              canvas.width = modalImg.naturalWidth;
              canvas.height = modalImg.naturalHeight;

              ctx.drawImage(modalImg, 0, 0);

              try {
                link.href = canvas.toDataURL('image/jpeg', 0.8);
              } catch (err) {
                const response = await fetch(imgSrc);
                const blob = await response.blob();
                link.href = URL.createObjectURL(blob);
              }
            } else {
              link.href = imgSrc;
            }

            link.download = `image-${currentIndex + 1}.jpg`;
            link.target = "_self"; // Force same page
            link.rel = "noopener noreferrer"; // Security best practice

            // Use a more controlled approach to trigger the download
            document.body.appendChild(link);

            // Use a timeout to ensure the browser processes the download attribute
            setTimeout(() => {
              link.click();
              document.body.removeChild(link);
            }, 0);
          }

          // Success message
          showSuccessMessage('Image downloaded successfully!');

        } catch (error) {
          console.error('Download error:', error);
          showSuccessMessage('Download failed. Please try again.', true);
        }
      });
    }

    // Helper function for showing messages
    function showSuccessMessage(message, isError = false) {
      const msg = document.createElement('div');
      msg.textContent = message;
      msg.style.position = 'fixed';
      msg.style.bottom = '20px';
      msg.style.left = '50%';
      msg.style.transform = 'translateX(-50%)';
      msg.style.backgroundColor = isError ? 'rgba(220, 53, 69, 0.9)' : 'rgba(40, 167, 69, 0.9)';
      msg.style.color = 'white';
      msg.style.padding = '10px 20px';
      msg.style.borderRadius = '5px';
      msg.style.zIndex = '10000';
      document.body.appendChild(msg);

      setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transition = 'opacity 0.5s ease';
        setTimeout(() => document.body.removeChild(msg), 500);
      }, 2000);
    }

    // Improved close animation
    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }

    modalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (modal.style.display !== 'none') {
        switch (e.key) {
          case 'ArrowRight':
            modalNext?.click();
            break;
          case 'ArrowLeft':
            modalPrev?.click();
            break;
          case 'Escape':
            closeModal();
            break;
        }
      }
    });

    // Add touch swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next
        modalNext?.click();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous
        modalPrev?.click();
      }
    }
  }
}

/**
 * Enhanced News Search Feature
 * Advanced search functionality for the news section with real-time filtering,
 * highlighting, sorting options, and improved user experience.
 */
function initSearchFeature() {
  // Get all search forms on the page
  const searchForms = document.querySelectorAll('.search-box');
  // Get all search inputs
  const searchInputs = document.querySelectorAll('.search-box input[type="search"]');
  const mainContent = document.querySelector('.content');
  const sidebar = document.querySelector('.sidebar');

  // If no search elements found, exit early
  if (!searchForms.length || !searchInputs.length || !mainContent || !sidebar) return;

  const activeFilters = {
    category: null,
    date: null,
  };
  let currentSort = 'newest'; // Default sort order
  let debounceTimer;

  // Create search UI elements
  const searchUI = createSearchUI();
  const { searchResults, backButton, searchStatus, filterContainer, sortOptions } = searchUI;

  // Sample news data with more realistic images using picsum.photos
  const newsData = [
    {
      id: 1,
      title: "Celebrating Excellence at Lady Of Mercy Preparatory School",
      content: "This November, Lady Of Mercy Preparatory School proudly celebrates another year of academic excellence with outstanding achievements across all departments. Our students have demonstrated exceptional dedication to their studies and extracurricular activities.",
      date: "November 25, 2024",
      timestamp: new Date("2024-11-25").getTime(),
      author: "Samuel Frimpong",
      category: "academic, events",
      image: "https://picsum.photos/800/500?random=1",
      imageAlt: "Students receiving academic excellence awards",
      tags: ["excellence", "awards", "academics"],
      href: "celebrating-excellence.html"
    },
    {
      id: 2,
      title: "Lady Of Mercy Achieves Outstanding BECE Results",
      content: "Lady Of Mercy Preparatory School is proud to announce our exceptional achievement in the 2023 Basic Education Certificate Examination (BECE). Our students have once again demonstrated remarkable academic prowess with 95% of candidates scoring distinction grades across all subjects.",
      date: "November 15, 2024",
      timestamp: new Date("2024-11-15").getTime(),
      author: "Samuel Frimpong",
      category: "achievements",
      image: "https://picsum.photos/800/500?random=2",
      imageAlt: "Students celebrating BECE examination results",
      tags: ["BECE", "examination", "results"],
      href: "bece-results-2023.html",
    },
    {
      id: 3,
      title: "Annual Sports Festival Showcases Athletic Talent",
      content: "The annual Lady Of Mercy Sports Festival concluded last week with spectacular displays of athletic talent across various sporting disciplines. Students competed in track and field events, swimming, basketball, and football.",
      date: "October 30, 2024",
      timestamp: new Date("2024-10-30").getTime(),
      author: "Charles Boakye",
      category: "sports",
      image: "https://picsum.photos/800/500?random=3",
      imageAlt: "Students participating in sports activities during the festival",
      tags: ["sports", "athletics", "competition"],
      href: "sports-day-2024.html",
    },
    {
      id: 4,
      title: "New Science Laboratory Inaugurated",
      content: "Lady Of Mercy Preparatory School has inaugurated a state-of-the-art science laboratory equipped with modern facilities to enhance practical learning experiences for our students. The new laboratory features advanced equipment for physics, chemistry, and biology experiments.",
      date: "October 15, 2024",
      timestamp: new Date("2024-10-15").getTime(),
      author: "Micheal Jackson",
      category: "facilities",
      image: "https://picsum.photos/800/500?random=4",
      imageAlt: "New science laboratory with modern equipment",
      tags: ["science", "laboratory", "facilities", "innovation"],
      href: "new-science-lab.html",
    },
    {
      id: 5,
      title: "Cultural Day Celebration Highlights Diversity",
      content: "The annual Cultural Day celebration at Lady Of Mercy Preparatory School showcased the rich cultural diversity within our school community. Students presented traditional dances, music, food, and attire from various ethnic backgrounds, promoting cultural awareness and appreciation.",
      date: "September 28, 2024",
      timestamp: new Date("2024-09-28").getTime(),
      author: "Akosua Mensah",
      category: "events",
      image: "https://picsum.photos/800/500?random=5",
      imageAlt: "Students in traditional attire during Cultural Day celebration",
      tags: ["culture", "diversity", "celebration", "tradition"],
      href: "cultural-day.html",
    },
    {
      id: 6,
      title: "Admissions Open for 2025 Academic Year",
      content: "Lady Of Mercy Preparatory School is now accepting applications for the 2025 academic year. We invite parents and guardians to enroll their children in our esteemed institution, known for its commitment to academic excellence and holistic development.",
      date: "April 3, 2025",
      timestamp: new Date("2025-04-3").getTime(),
      author: "Mr.Charles Boakye",
      category: "academic",
      image: "https://picsum.photos/800/500?random=6",
      imageAlt: "Admissions open for 2025 academic year at Lady Of Mercy Preparatory School",
      tags: ["culture", "diversity", "celebration", "tradition"],
      href: "admission.html",
    },
    {
      id: 7,
      title: "Mission, Vision and Mode Of Education",
      content: "Lady Of Mercy Preparatory School's mission is to provide a nurturing and stimulating environment that fosters academic excellence, character development, and social responsibility. Our vision is to be a leading educational institution that empowers students to become lifelong learners and responsible citizens.",
      date: "March 7, 2025",
      timestamp: new Date("2025-03-7").getTime(),
      author: "Mr.Charles Boakye",
      category: "academic",
      image: "https://picsum.photos/800/500?random=6",
      imageAlt: "Mission, Vision and Mode Of Education at Lady Of Mercy Preparatory School",
      tags: ["culture", "diversity", "celebration", "tradition"],
      href: "mission.html",
    }
  ];

  // Extract unique categories for filter options
  const categories = [...new Set(newsData.map((item) => {
    // Handle comma-separated categories
    if (item.category && item.category.includes(',')) {
      return item.category.split(',').map(c => c.trim());
    }
    return item.category;
  }).flat().filter(Boolean))];

  populateFilterOptions(categories);

  // Set up event listeners
  setupEventListeners();

  /**
   * Creates and returns all search UI elements
   */
  function createSearchUI() {
    // Create a container for the search results to be placed on the left side (replacing main content)
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.innerHTML = `
            <div class="search-loading">
                <div class="spinner"></div>
                <p>Searching...</p>
            </div>
        `;

    // Create search status element
    const searchStatus = document.createElement('div');
    searchStatus.className = 'search-status';
    searchResults.appendChild(searchStatus);

    // Create a container for the results
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';
    searchResults.appendChild(resultsContainer);

    // Create back button and place it after the results container
    const backButton = document.createElement('button');
    backButton.className = 'back-to-posts';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back to All Posts';
    // Initially hide the back button
    backButton.style.display = 'none';
    searchResults.appendChild(backButton);

    // Move filter options to the sidebar (right side)
    const filterContainer = document.createElement('div');
    filterContainer.className = 'search-filters';
    filterContainer.innerHTML = `
            <h3>Filter Results</h3>
            <div class="filter-options">
                <div class="filter-group">
                    <label>Category:</label>
                    <select class="category-filter">
                        <option value="">All Categories</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Date Range:</label>
                    <select class="date-filter">
                        <option value="">All Time</option>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 3 Months</option>
                        <option value="365">Last Year</option>
                    </select>
                </div>
            </div>
        `;

    // Add filter container to the sidebar
    sidebar.appendChild(filterContainer);

    const sortOptions = document.createElement('div');
    sortOptions.className = 'sort-options';
    sortOptions.innerHTML = `
            <label>Sort by:</label>
            <select class="sort-select">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="relevance">Relevance</option>
            </select>
        `;
    filterContainer.appendChild(sortOptions);

    // Insert search results after main content container (but don't append to DOM yet)
    // We'll show/hide it as needed in showSearchInterface and resetSearch
    mainContent.parentNode.insertBefore(searchResults, mainContent.nextSibling);
    searchResults.style.display = 'none'; // Initially hidden

    return { searchResults, backButton, searchStatus, filterContainer, sortOptions };
  }

  /**
   * Populates filter dropdowns with options
   */
  function populateFilterOptions(categories) {
    const categoryFilter = document.querySelector('.category-filter');
    if (!categoryFilter) return;

    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryFilter.appendChild(option);
    });
  }

  /**
   * Sets up all event listeners for search functionality
   */
  function setupEventListeners() {
    // Add event listeners to all search forms
    searchForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch();
      });
    });

    // Add event listeners to all search inputs
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        // Synchronize all search inputs with the current value
        const currentValue = e.target.value;
        searchInputs.forEach(otherInput => {
          if (otherInput !== e.target) {
            otherInput.value = currentValue;
          }
        });

        clearTimeout(debounceTimer);
        const loadingElement = searchResults.querySelector('.search-loading');
        if (loadingElement) {
          loadingElement.style.display = 'flex';
        }

        debounceTimer = setTimeout(() => {
          if (currentValue.trim().length >= 2) {
            performSearch();
          } else if (currentValue.trim().length === 0) {
            resetSearch();
          }
        }, 300);
      });
    });

    // Back button is now inside search results
    backButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      resetSearch();
    });

    const categoryFilter = document.querySelector('.category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        activeFilters.category = e.target.value;
        applyFilters();
      });
    }

    const dateFilter = document.querySelector('.date-filter');
    if (dateFilter) {
      dateFilter.addEventListener('change', (e) => {
        activeFilters.date = e.target.value;
        applyFilters();
      });
    }

    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFilters();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (searchResults.classList.contains('active') && e.key === 'Escape') {
        resetSearch();
      }
    });
  }

  /**
   * Performs search based on current input and filters
   */
  function performSearch() {
    // Get the search term from the first input (they should all be synchronized)
    const searchTerm = searchInputs[0].value.toLowerCase().trim();

    if (searchTerm.length < 2 && !activeFilters.category && !activeFilters.date) {
      showNotification('Please enter at least 2 characters to search');
      return;
    }

    showSearchInterface();
    const results = filterResults(searchTerm);

    // Show loading indicator
    const loadingIndicator = searchResults.querySelector('.search-loading');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'flex';
    }

    setTimeout(() => {
      displaySearchResults(results, searchTerm);
      // Hide loading indicator after results are displayed
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }, 300);
  }

  /**
   * Filters news data based on search term and active filters
   */
  function filterResults(searchTerm) {
    let results = [...newsData];

    if (searchTerm.length >= 2) {
      results = results.filter((item) => {
        // Check in standard text fields
        const textMatch = [item.title, item.content, item.category]
          .some((field) => field && field.toLowerCase().includes(searchTerm));

        // Check in tags
        const tagMatch = item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

        // Check in image path and alt text (if image exists)
        let imageMatch = false;
        if (item.image) {
          // Extract filename from path for searching
          const imagePath = item.image.toLowerCase();
          const imageFilename = imagePath.split('/').pop().split('.')[0];

          // Check if search term is in image path or filename
          imageMatch = imagePath.includes(searchTerm) || imageFilename.includes(searchTerm);

          // If item has an imageAlt property, check that too
          if (item.imageAlt) {
            imageMatch = imageMatch || item.imageAlt.toLowerCase().includes(searchTerm);
          } else {
            // If no specific alt text, use title as fallback for image alt text search
            imageMatch = imageMatch || item.title.toLowerCase().includes(searchTerm);
          }
        }

        return textMatch || tagMatch || imageMatch;
      });
    }

    if (activeFilters.category) {
      results = results.filter((item) => {
        if (!item.category) return false;

        // Handle comma-separated categories
        if (item.category.includes(',')) {
          const categories = item.category.split(',').map(c => c.trim());
          return categories.includes(activeFilters.category);
        }

        return item.category === activeFilters.category;
      });
    }

    if (activeFilters.date) {
      const cutoffTime = Date.now() - activeFilters.date * 24 * 60 * 60 * 1000;
      results = results.filter((item) => item.timestamp >= cutoffTime);
    }

    return sortResults(results, searchTerm);
  }

  /**
   * Sorts results based on selected sort option
   */
  function sortResults(results, searchTerm) {
    if (currentSort === 'newest') {
      return results.sort((a, b) => b.timestamp - a.timestamp);
    }
    if (currentSort === 'oldest') {
      return results.sort((a, b) => a.timestamp - b.timestamp);
    }
    if (currentSort === 'relevance' && searchTerm.length >= 2) {
      return results.sort((a, b) => {
        const aRelevance = a.title.toLowerCase().includes(searchTerm) ? 1 : 0;
        const bRelevance = b.title.toLowerCase().includes(searchTerm) ? 1 : 0;
        return bRelevance - aRelevance || b.timestamp - a.timestamp;
      });
    }
    return results;
  }

  /**
   * Displays search results with highlighting
   */
  function displaySearchResults(results, searchTerm) {
    const loadingElement = searchResults.querySelector('.search-loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }

    // Get the results container we created earlier
    const resultsContainer = searchResults.querySelector('.results-container');
    if (!resultsContainer) return;

    updateSearchStatus(results.length, searchTerm);

    if (results.length === 0) {
      resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search-minus"></i>
                    <p>No results found for your search.</p>
                    <p class="search-suggestion">Try using different keywords or removing filters.</p>
                    <p class="search-suggestion">You can also search for images by their description or category.</p>
                </div>
            `;
    } else {
      resultsContainer.innerHTML = results
        .map((item) => `
                    <div class="result-item" data-id="${item.id}">
                        ${item.image ? `
                            <div class="result-image">
                                <img src="${item.image}" alt="${item.imageAlt || item.title}" loading="lazy">
                            </div>
                        ` : ''}
                        <div class="result-content">
                            <h3>${highlightText(item.title, searchTerm)}</h3>
                            <p>${highlightText(item.content.substring(0, 150) + '...', searchTerm)}</p>
                            <div class="result-meta">
                                <span class="result-date"><i class="far fa-calendar-alt"></i> ${item.date}</span>
                                <span class="result-author"><i class="far fa-user"></i> ${item.author}</span>
                                <span class="result-category"><i class="far fa-folder"></i> ${item.category}</span>
                                ${item.tags && item.tags.length > 0 ? `
                                    <span class="result-tags"><i class="fas fa-tags"></i> ${item.tags.map(tag => highlightText(tag, searchTerm)).join(', ')}</span>
                                ` : ''}
                            </div>
                             <a href="${item.href}" class="read-more">Read More</a>
                        </div>
                    </div>
                `)
        .join('');
    }

    // For mobile devices, scroll to the search results after they're displayed
    if (window.innerWidth <= 992) {
      // Small delay to ensure the DOM has updated
      setTimeout(() => {
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  /**
   * Updates search status message
   */
  function updateSearchStatus(resultCount, searchTerm) {
    if (!searchStatus) return;

    searchStatus.textContent = searchTerm
      ? `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "${searchTerm}"`
      : `Showing ${resultCount} result${resultCount !== 1 ? 's' : ''}`;
  }

  /**
   * Highlights search term in text
   */
  function highlightText(text, searchTerm) {
    if (!searchTerm || !text) return text || '';
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Shows notification message
   */
  function showNotification(message) {
    let notification = document.querySelector('.search-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'search-notification';
      document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add('active');

    setTimeout(() => notification.classList.remove('active'), 3000);
  }

  /**
   * Shows search interface
   */
  function showSearchInterface() {
    // Hide the main content and show search results in its place
    mainContent.style.display = 'none';
    searchResults.style.display = 'flex';
    searchResults.classList.add('active');
    backButton.style.display = 'block'; // Ensure back button is visible

    // Make sure sidebar is visible and styled appropriately during search
    sidebar.classList.add('search-active');

    // For mobile devices, scroll to the search results
    if (window.innerWidth <= 992) {
      // Small delay to ensure the DOM has updated
      setTimeout(() => {
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
          searchBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  /**
   * Resets search to original state
   */
  function resetSearch() {
    // Show the main content and hide search results
    mainContent.style.display = 'block';
    searchResults.style.display = 'none';
    searchResults.classList.remove('active');
    backButton.style.display = 'none'; // Hide back button

    // Reset sidebar state
    sidebar.classList.remove('search-active');

    // Reset all search inputs
    searchInputs.forEach(input => {
      input.value = '';
    });

    // Reset all filters
    const categoryFilter = document.querySelector('.category-filter');
    if (categoryFilter) categoryFilter.value = '';

    const dateFilter = document.querySelector('.date-filter');
    if (dateFilter) dateFilter.value = '';

    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) sortSelect.value = 'newest';

    activeFilters.category = null;
    activeFilters.date = null;
    currentSort = 'newest';
  }

  /**
   * Applies current filters without changing search term
   */
  function applyFilters() {
    // Get the search term from the first input (they should all be synchronized)
    const searchTerm = searchInputs[0].value.toLowerCase().trim();
    showSearchInterface();
    const results = filterResults(searchTerm);
    displaySearchResults(results, searchTerm);
  }
}