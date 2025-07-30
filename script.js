document.addEventListener('DOMContentLoaded', () => {
    const modules = document.querySelectorAll('.module');
    const modal = document.getElementById('module-modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCredits = document.getElementById('modal-credits');
    const toggleStatusButton = document.getElementById('toggle-status-button');

    const filterAllButton = document.getElementById('filter-all');
    const filterCompletedButton = document.getElementById('filter-completed');
    const filterPendingButton = document.getElementById('filter-pending');

    let currentModule = null; // To keep track of the module currently open in the modal

    // Function to update module status and modal button
    const updateModuleStatus = (moduleElement, newStatus) => {
        moduleElement.dataset.status = newStatus;
        if (newStatus === 'completed') {
            moduleElement.classList.remove('pending');
            moduleElement.classList.add('completed');
            toggleStatusButton.textContent = 'Marcar como Pendiente';
            toggleStatusButton.className = 'complete'; // Class for styling "Mark as Pending"
        } else {
            moduleElement.classList.remove('completed');
            moduleElement.classList.add('pending');
            toggleStatusButton.textContent = 'Marcar como Completado';
            toggleStatusButton.className = 'pending'; // Class for styling "Mark as Completed"
        }
        filterModules(document.querySelector('.filter-controls button.active').id.replace('filter-', ''));
    };

    // Event listener for each module to open the modal
    modules.forEach(module => {
        module.addEventListener('click', () => {
            currentModule = module;
            modalTitle.textContent = module.querySelector('h3').textContent;
            modalDescription.textContent = module.dataset.description;
            modalCredits.textContent = module.querySelector('p').textContent; // Get credits text

            // Set button text and class based on current module status
            if (module.dataset.status === 'completed') {
                toggleStatusButton.textContent = 'Marcar como Pendiente';
                toggleStatusButton.className = 'complete'; // Class for styling "Mark as Pending"
            } else {
                toggleStatusButton.textContent = 'Marcar como Completado';
                toggleStatusButton.className = 'pending'; // Class for styling "Mark as Completed"
            }
            modal.style.display = 'flex'; // Use flex to center the modal
        });
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Toggle module status from within the modal
    toggleStatusButton.addEventListener('click', () => {
        if (currentModule) {
            const newStatus = currentModule.dataset.status === 'completed' ? 'pending' : 'completed';
            updateModuleStatus(currentModule, newStatus);
            modal.style.display = 'none'; // Close modal after changing status
        }
    });

    // Function to filter modules
    const filterModules = (filterType) => {
        modules.forEach(module => {
            const status = module.dataset.status;
            if (filterType === 'all') {
                module.style.display = 'block';
            } else if (filterType === 'completed' && status === 'completed') {
                module.style.display = 'block';
            } else if (filterType === 'pending' && status === 'pending') {
                module.style.display = 'block';
            } else {
                module.style.display = 'none';
            }
        });
    };

    // Add event listeners for filter buttons
    filterAllButton.addEventListener('click', () => {
        filterModules('all');
        filterAllButton.classList.add('active');
        filterCompletedButton.classList.remove('active');
        filterPendingButton.classList.remove('active');
    });

    filterCompletedButton.addEventListener('click', () => {
        filterModules('completed');
        filterCompletedButton.classList.add('active');
        filterAllButton.classList.remove('active');
        filterPendingButton.classList.remove('active');
    });

    filterPendingButton.addEventListener('click', () => {
        filterModules('pending');
        filterPendingButton.classList.add('active');
        filterAllButton.classList.remove('active');
        filterCompletedButton.classList.remove('active');
    });

    // Initialize all modules as pending (or set default status in HTML)
    modules.forEach(module => {
        if (!module.dataset.status) {
            module.dataset.status = 'pending'; // Default status if not specified
        }
    });

    // Initial filter to show all modules
    filterModules('all');
});
