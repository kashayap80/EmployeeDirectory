// script.js - Updated with all fixes

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navRight = document.querySelector('.nav-right');
const navSearchBar = document.getElementById("navSearchBar");
const sortSelect = document.getElementById("sortSelect");
const adminControls = document.getElementById("adminControls");
const departmentModal = document.getElementById("departmentModal");
const addEmployeeModal = document.getElementById("addEmployeeModal");
const addEmployeeForm = document.getElementById("addEmployeeForm");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const closeAddForm = document.getElementById("closeAddForm");
const employeeGrid = document.getElementById("employeeGrid");
const departmentGrid = document.getElementById("departmentGrid");
const adminDropdown = document.getElementById('adminDropdown');
const adminButton = document.querySelector('.admin-dropdown .btn-secondary');
const dropdownContent = document.querySelector('.dropdown-content');
const logoutBtn = document.getElementById('logoutBtn');
const closeButtons = document.querySelectorAll('.close');
const globalSearch = document.getElementById('globalSearch');
const noResults = document.getElementById('noResults');

// Authentication credentials
const AUTH_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Sample employee data initialization
const sampleEmployees = [
    {
        id: "EMP001",
        name: "John Smith",
        position: "Senior Software Engineer",
        department: "Engineering",
        email: "john.smith@techcorp.com",
        phone: "(555) 123-4567",
        joinDate: "2020-03-15",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: "EMP002",
        name: "Sarah Johnson",
        position: "Marketing Director",
        department: "Marketing",
        email: "sarah.j@techcorp.com",
        phone: "(555) 234-5678",
        joinDate: "2019-06-20",
        image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        id: "EMP003",
        name: "Michael Chen",
        position: "Product Manager",
        department: "Product",
        email: "m.chen@techcorp.com",
        phone: "(555) 345-6789",
        joinDate: "2021-01-10",
        image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        id: "EMP004",
        name: "Emily Davis",
        position: "HR Manager",
        department: "Human Resources",
        email: "emily.d@techcorp.com",
        phone: "(555) 456-7890",
        joinDate: "2020-09-05",
        image: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
        id: "EMP005",
        name: "David Wilson",
        position: "Financial Analyst",
        department: "Finance",
        email: "d.wilson@techcorp.com",
        phone: "(555) 567-8901",
        joinDate: "2021-03-22",
        image: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
        id: "EMP006",
        name: "Rachel Green",
        position: "Marketing Specialist",
        department: "Marketing",
        email: "rachel.g@techcorp.com",
        phone: "(555) 678-9012",
        joinDate: "2021-05-15",
        image: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
        id: "EMP007",
        name: "Thomas Anderson",
        position: "Software Engineer",
        department: "Engineering",
        email: "t.anderson@techcorp.com",
        phone: "(555) 789-0123",
        joinDate: "2021-07-01",
        image: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
        id: "EMP100",
        name: "Sophia Zhang",
        position: "Data Analyst",
        department: "Research",
        email: "s.zhang@techcorp.com",
        phone: "(555) 901-2345",
        joinDate: "2023-06-15",
        image: "https://randomuser.me/api/portraits/women/100.jpg"
    },
    {
        id: "EMP008",
        name: "Lisa Anderson",
        position: "UX Designer",
        department: "Engineering",
        email: "l.anderson@techcorp.com",
        phone: "(555) 234-5678",
        joinDate: "2021-08-15",
        image: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
        id: "EMP009",
        name: "Mark Wilson",
        position: "Sales Manager",
        department: "Sales",
        email: "m.wilson@techcorp.com",
        phone: "(555) 345-6789",
        joinDate: "2021-09-01",
        image: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    {
        id: "EMP010",
        name: "Emma Brown",
        position: "Content Writer",
        department: "Marketing",
        email: "e.brown@techcorp.com",
        phone: "(555) 456-7890",
        joinDate: "2021-10-15",
        image: "https://randomuser.me/api/portraits/women/10.jpg"
    }
];

// Department data structure
let departments = {
    'Engineering': { icon: 'fas fa-laptop-code', employees: [] },
    'Marketing': { icon: 'fas fa-bullhorn', employees: [] },
    'HR': { icon: 'fas fa-users', employees: [] },
    'Finance': { icon: 'fas fa-chart-line', employees: [] }
};

// Function to add employee to department
function addEmployeeToDepartment(employee) {
    if (departments[employee.department]) {
        departments[employee.department].employees.push(employee);
        updateDepartmentView();
    }
}

// Function to remove employee from department
function removeEmployeeFromDepartment(employeeId, department) {
    if (departments[department]) {
        departments[department].employees = departments[department].employees.filter(
            emp => emp.id !== employeeId
        );
        updateDepartmentView();
    }
}

// Function to update department view
function updateDepartmentView() {
    const departmentContainer = document.querySelector('.departments-list');
    if (!departmentContainer) return;

    departmentContainer.innerHTML = '';
    
    Object.entries(departments).forEach(([name, data]) => {
        const deptCard = document.createElement('div');
        deptCard.className = 'department-card';
        deptCard.innerHTML = `
            <div class="department-icon">
                <i class="${data.icon}"></i>
            </div>
            <h3>${name}</h3>
            <p>${data.employees.length} Employees</p>
            <button class="btn btn-primary" onclick="showDepartmentDetails('${name}')">
                View Details
            </button>
        `;
        departmentContainer.appendChild(deptCard);
    });
}

// Function to show department details
function showDepartmentDetails(departmentName) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const departmentEmployees = employees.filter(emp => emp.department === departmentName);
    
    const modal = document.getElementById('departmentModal');
    const details = document.getElementById('departmentDetails');

    if (!details || !modal) return;

    // Get department icon
    const departmentIcons = {
        'Engineering': 'fas fa-code',
        'Marketing': 'fas fa-bullhorn',
        'Sales': 'fas fa-chart-line',
        'Human Resources': 'fas fa-users',
        'Finance': 'fas fa-calculator',
        'Operations': 'fas fa-cogs',
        'Research': 'fas fa-flask',
        'IT Support': 'fas fa-laptop'
    };

    const icon = departmentIcons[departmentName] || 'fas fa-building';

    details.innerHTML = `
        <div class="modal-header">
            <h2>${departmentName} Department</h2>
            <button class="close" onclick="closeDepartmentModal()">&times;</button>
        </div>
        <div class="department-info">
            <div class="department-icon large">
                <i class="${icon}" aria-hidden="true"></i>
            </div>
            <h3>Team Members (${departmentEmployees.length})</h3>
            <div class="department-employee-list">
                ${departmentEmployees.map(emp => `
                    <div class="department-employee-card">
                        <img src="${emp.image}" alt="${emp.name}">
                        <div class="department-employee-info">
                            <h4>${emp.name}</h4>
                            <p>${emp.position}</p>
                            <p class="employee-details">
                                <span><i class="fas fa-id-badge"></i> ${emp.id}</span>
                                <span><i class="fas fa-envelope"></i> ${emp.email}</span>
                                <span><i class="fas fa-phone"></i> ${emp.phone}</span>
                                <span><i class="fas fa-calendar"></i> Joined: ${formatDate(emp.joinDate)}</span>
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Update existing addEmployee function
const originalAddEmployee = addEmployee;
addEmployee = function(employeeData) {
    originalAddEmployee(employeeData);
    addEmployeeToDepartment(employeeData);
};

// Update existing deleteEmployee function
const originalDeleteEmployee = deleteEmployee;
deleteEmployee = function(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        removeEmployeeFromDepartment(employeeId, employee.department);
    }
    originalDeleteEmployee(employeeId);
};

// Initialize department view when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Populate departments with existing employees
    employees.forEach(employee => {
        addEmployeeToDepartment(employee);
    });
    updateDepartmentView();
});

// Simple hash function (for demo - use proper crypto in production)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash.toString();
}

// Navigation and Theme Toggle
function initializeNavigation() {
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navRight.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('active');
                navRight.classList.remove('active');
            }
        });
    }
}

// Theme Toggle
function initializeThemeToggle() {
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Initialize login functionality
function initializeLogin() {
    // Check login status on page load
    checkLoginStatus();

    // Add event listeners for login button
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (loginModal) {
                loginModal.style.display = 'block';
                // Clear any previous error messages
                if (loginError) {
                    loginError.textContent = '';
                    loginError.style.display = 'none';
                }
            }
        });
    }

    // Initialize admin dropdown
    if (adminButton) {
        adminButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdownContent) {
                dropdownContent.classList.toggle('show');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.admin-dropdown') && dropdownContent) {
                dropdownContent.classList.remove('show');
            }
        });
    }

    // Close modal when clicking the close button
    if (closeButtons) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Initialize Add Employee functionality
    initializeAddEmployee();
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showLoginError('Please enter both username and password');
        return;
    }

    if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
        // Set login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        
        // Update UI
        updateLoginUI(true);
        
        // Clear form and close modal
        loginForm.reset();
        if (loginModal) {
            loginModal.style.display = 'none';
        }
        
        // Show success message
        alert('Login successful!');
    } else {
        showLoginError('Invalid username or password');
    }
}

// Show login error message
function showLoginError(message) {
    if (loginError) {
        loginError.textContent = message;
        loginError.style.display = 'block';
    }
}

// Handle logout
function handleLogout(e) {
    if (e) e.preventDefault();
    
    // Clear login status
    localStorage.removeItem('isLoggedIn');
    
    // Update UI
    updateLoginUI(false);
    
    // Close dropdown if open
    if (dropdownContent) {
        dropdownContent.classList.remove('show');
    }
    
    // Show message
    alert('Logged out successfully');
    
    // Redirect to home page if not already there
    if (!window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateLoginUI(isLoggedIn);
}

// Update UI based on login status
function updateLoginUI(isLoggedIn) {
    // Update login button visibility
    if (loginBtn) {
        loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    }
    
    // Update admin dropdown visibility
    if (adminDropdown) {
        adminDropdown.style.display = isLoggedIn ? 'block' : 'none';
    }
    
    // Update add employee button visibility
    if (addEmployeeBtn) {
        addEmployeeBtn.style.display = isLoggedIn ? 'block' : 'none';
    }
}

// Session Management
let sessionTimeout;

function startSessionTimer() {
    const timeout = 30 * 60 * 1000; // 30 minutes
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        handleLogout();
        alert('Your session has expired. Please login again.');
    }, timeout);
}

// Admin Access Check
function checkAdminAccess() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('Admin access required. Please login.');
        document.getElementById('loginModal').style.display = 'block';
        return false;
    }
    return true;
}

// Employee CRUD Operations
function initializeAddEmployee() {
    document.querySelectorAll('#addEmployeeBtn').forEach(button => {
        button.addEventListener('click', () => {
            if (!checkAdminAccess()) return;
            document.getElementById('addEmployeeModal').style.display = 'block';
        });
    });

    document.querySelectorAll('#addEmployeeForm').forEach(form => {
        form.addEventListener('submit', handleAddEmployee);
    });
}

// Function to get department details by name
function getDepartmentByName(deptName) {
    return departments.find(dept => dept.name === deptName);
}

// Function to count employees in each department
function getEmployeeCountByDepartment(deptName) {
    return employees.filter(emp => emp.department === deptName).length;
}

// Function to update department counts in the UI
function updateDepartmentCounts() {
    const departmentItems = document.querySelectorAll('.department-item');
    departmentItems.forEach(item => {
        const deptName = item.querySelector('.department-info h3').textContent;
        const countSpan = item.querySelector('.employee-count');
        const count = getEmployeeCountByDepartment(deptName);
        countSpan.textContent = `${count} ${count === 1 ? 'Employee' : 'Employees'}`;
    });
}

// Modified handleAddEmployee function
function handleAddEmployee(e) {
    e.preventDefault();
    if (!checkAdminAccess()) return;

    const firstName = document.getElementById('empFirstName').value.trim();
    const lastName = document.getElementById('empLastName').value.trim();
    const department = document.getElementById('empDept').value;
    const position = document.getElementById('empPosition').value.trim();
    const joiningDate = document.getElementById('empJoinDate').value;
    const imageUrl = document.getElementById('empImage').value.trim() || 'https://via.placeholder.com/150';

    // Basic validation
    if (!firstName || !lastName || !department || !position || !joiningDate) {
        alert('Please fill in all required fields');
        return;
    }

    const employeeData = {
        name: `${firstName} ${lastName}`,
        department: department,
        position: position,
        joiningDate: joiningDate,
        image: imageUrl,
        id: generateEmployeeID(joiningDate)
    };

    // Check if we're editing or adding new
    const editIndex = e.target.dataset.editIndex;
    if (editIndex !== undefined) {
        // Editing existing employee
        employeeData.id = employees[editIndex].id;
        updateEmployee(editIndex, employeeData);
    } else {
        // Adding new employee
        employees.push(employeeData);
        saveEmployees();
        alert(`Employee added successfully!\nEmployee ID: ${employeeData.id}`);
    }

    // Reset form and close modal
    e.target.reset();
    delete e.target.dataset.editIndex;
    document.getElementById('addEmployeeModal').style.display = 'none';
    document.getElementById('addEmployeeTitle').textContent = 'Add Employee';
    
    // Update both directory and department views
    if (document.getElementById('employeeGrid')) {
        renderEmployees(employees);
    }
    if (document.querySelector('.departments-list')) {
        updateDepartmentCounts();
    }
}

// Modified renderDepartments function
function renderDepartments() {
    const departmentsList = document.querySelector('.departments-list');
    if (!departmentsList) return;

    departmentsList.innerHTML = '';
    
    departments.forEach(dept => {
        const employeeCount = getEmployeeCountByDepartment(dept.name);
        const departmentItem = document.createElement('div');
        departmentItem.className = 'department-item';
        departmentItem.setAttribute('role', 'listitem');
        departmentItem.setAttribute('tabindex', '0');
        
        departmentItem.innerHTML = `
            <div class="department-icon">
                <i class="${dept.icon}" aria-hidden="true"></i>
            </div>
            <div class="department-info">
                <h3>${dept.name}</h3>
                <p>${dept.description}</p>
                <span class="employee-count">${employeeCount} ${employeeCount === 1 ? 'Employee' : 'Employees'}</span>
            </div>
        `;
        
        departmentItem.addEventListener('click', () => showDepartmentDetails(dept.id));
        departmentsList.appendChild(departmentItem);
    });
}

// Modified showDepartmentDetails function
function showDepartmentDetails(deptId) {
    const department = departments.find(d => d.id === deptId);
    if (!department) return;
    
    const deptEmployees = employees.filter(emp => emp.department === department.name);
    const modal = document.getElementById('departmentModal');
    const details = document.getElementById('departmentDetails');

    deptEmployees.sort((a, b) => a.position.localeCompare(b.position));

    details.innerHTML = `
        <div class="modal-header">
            <h2>${department.name} Department</h2>
            <button class="close" onclick="closeDepartmentModal()">&times;</button>
        </div>
        <div class="department-info">
            <div class="department-icon large">
                <i class="${department.icon}" aria-hidden="true"></i>
            </div>
            <p>${department.description}</p>
            <h3>Team Members (${deptEmployees.length})</h3>
            <div class="employee-list">
                ${deptEmployees.map(emp => `
                    <div class="employee-item">
                        <img src="${emp.image}" alt="${emp.name}">
                        <div class="employee-info">
                            <h4>${emp.name}</h4>
                            <p>${emp.position}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeThemeToggle();
    initializeLogin();
    loadEmployees();
    
    // Initialize page-specific features
    if (window.location.pathname.includes('directory.html')) {
        if (navSearchBar) initializeSearch();
        if (sortSelect) initializeSort();
        if (employeeGrid) renderEmployees(employees);
    } else if (window.location.pathname.includes('departments.html')) {
        if (document.querySelector('.departments-list')) {
            renderDepartments();
        }
    }
});

// Employee CRUD Operations (continued)

// Render Employee Card
function createEmployeeCard(emp, index) {
  const card = document.createElement("div");
  card.className = "employee-card";
  card.innerHTML = `
      <div class="card-inner">
          <div class="card-front">
              <img src="${emp.image}" alt="${emp.name}" />
              <h3>${emp.name}</h3>
              <p>${emp.department}</p>
          </div>
          <div class="card-back">
              <p><strong>Position:</strong> ${emp.position}</p>
              <p><strong>ID:</strong> ${emp.id}</p>
              <p><strong>Joining Date:</strong> ${formatDate(emp.joiningDate)}</p>
              ${localStorage.getItem('isLoggedIn') === 'true' ? `
              <div class="card-actions">
                  <button class="btn-secondary" onclick="editEmployee(${index})">
                      <i class="fas fa-edit"></i> Edit
                  </button>
                  <button class="btn-danger" onclick="deleteEmployee(${index})">
                      <i class="fas fa-trash"></i> Delete
                  </button>
              </div>
              ` : ''}
          </div>
      </div>
  `;
  return card;
}

// Render Employees
function renderEmployees(list) {
  const employeeGrid = document.getElementById('employeeGrid');
  if (!employeeGrid) return;
  
  employeeGrid.innerHTML = "";
  
  if (list.length === 0) {
      employeeGrid.innerHTML = `
          <div class="empty-state">
              <i class="fas fa-users-slash"></i>
              <h3>No employees found</h3>
              ${localStorage.getItem('isLoggedIn') === 'true' ? `
              <button class="btn-primary" onclick="document.getElementById('addEmployeeModal').style.display='block'">
                  <i class="fas fa-plus"></i> Add First Employee
              </button>
              ` : ''}
          </div>
      `;
      return;
  }
  
  list.forEach((emp, index) => {
      employeeGrid.appendChild(createEmployeeCard(emp, index));
  });
}

// Edit Employee
function editEmployee(index) {
  if (!checkAdminAccess()) return;
  
  const emp = employees[index];
  const [firstName, ...lastNameParts] = emp.name.split(' ');
  const lastName = lastNameParts.join(' ');
  
  const form = document.getElementById('addEmployeeForm');
  form.dataset.editIndex = index;
  
  document.getElementById("empFirstName").value = firstName;
  document.getElementById("empLastName").value = lastName;
  document.getElementById("empDept").value = emp.department;
  document.getElementById("empPosition").value = emp.position;
  document.getElementById("empJoinDate").value = emp.joiningDate;
  document.getElementById("empImage").value = emp.image;
  
  document.getElementById('addEmployeeTitle').textContent = 'Edit Employee';
  document.getElementById('addEmployeeModal').style.display = 'block';
}

// Update Employee (called from handleAddEmployee when editing)
function updateEmployee(index, updatedData) {
  employees[index] = { ...employees[index], ...updatedData };
  saveEmployees();
  renderEmployees(employees);
  alert('Employee updated successfully!');
}

// Delete Employee
function deleteEmployee(index) {
  if (!checkAdminAccess()) return;
  
  if (confirm("Are you sure you want to delete this employee?")) {
      employees.splice(index, 1);
      saveEmployees();
      renderEmployees(employees);
      alert('Employee deleted successfully!');
  }
}

// Handle Add/Edit Employee Form Submission
function handleAddEmployee(e) {
  e.preventDefault();
  
  if (!checkAdminAccess()) return;

  const firstName = document.getElementById('empFirstName').value.trim();
  const lastName = document.getElementById('empLastName').value.trim();
  const department = document.getElementById('empDept').value;
  const position = document.getElementById('empPosition').value.trim();
  const joiningDate = document.getElementById('empJoinDate').value;
  const imageUrl = document.getElementById('empImage').value.trim() || 'https://via.placeholder.com/150';

  // Basic validation
  if (!firstName || !lastName || !department || !position || !joiningDate) {
      alert('Please fill in all required fields');
      return;
  }

  const employeeData = {
      name: `${firstName} ${lastName}`,
      department: department,
      position: position,
      joiningDate: joiningDate,
      image: imageUrl
  };

  // Check if we're editing or adding new
  const editIndex = e.target.dataset.editIndex;
  if (editIndex !== undefined) {
      // Editing existing employee
      employeeData.id = employees[editIndex].id; // Preserve ID
      updateEmployee(editIndex, employeeData);
  } else {
      // Adding new employee
      const newEmployee = {
          ...employeeData,
          id: generateEmployeeID(joiningDate)
      };
      employees.push(newEmployee);
      saveEmployees();
      alert(`Employee added successfully!\nEmployee ID: ${newEmployee.id}`);
  }

  // Reset form and close modal
  e.target.reset();
  delete e.target.dataset.editIndex;
  document.getElementById('addEmployeeModal').style.display = 'none';
  document.getElementById('addEmployeeTitle').textContent = 'Add Employee';
  
  // Re-render employees
  renderEmployees(employees);
}

// Department Functions
function renderDepartments() {
  const departmentGrid = document.getElementById('departmentGrid');
  if (!departmentGrid) return;
  
  departmentGrid.innerHTML = '';
  
  departments.forEach(dept => {
      const employeeCount = employees.filter(emp => emp.department === dept.name).length;
      const card = document.createElement('div');
      card.className = 'department-card';
      card.innerHTML = `
          <div class="card-content">
              <i class="${dept.icon}"></i>
              <h3>${dept.name}</h3>
              <p class="employee-count">${employeeCount} ${employeeCount === 1 ? 'Employee' : 'Employees'}</p>
              <p>${dept.description}</p>
              <button class="btn-secondary" onclick="showDepartmentDetails(${dept.id})">
                  View Team
              </button>
          </div>
      `;
      departmentGrid.appendChild(card);
  });
}

// Search and Sort Functions
function initializeSearch() {
  const searchInput = document.getElementById('navSearchBar');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredEmployees = employees.filter(emp => {
          return (
              emp.name.toLowerCase().includes(searchTerm) ||
              emp.position.toLowerCase().includes(searchTerm) ||
              emp.department.toLowerCase().includes(searchTerm) ||
              emp.id.toLowerCase().includes(searchTerm)
          );
      });
      renderEmployees(filteredEmployees);
  });
}

function initializeSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', (e) => {
      const sortBy = e.target.value;
      if (!sortBy) return;

      const sortedEmployees = [...employees].sort((a, b) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'department') return a.department.localeCompare(b.department);
          if (sortBy === 'position') return a.position.localeCompare(b.position);
          if (sortBy === 'joiningDate') return new Date(a.joiningDate) - new Date(b.joiningDate);
          return 0;
      });

      renderEmployees(sortedEmployees);
  });
}

// Utility Functions
function generateEmployeeID(dateOfJoining) {
  const year = new Date(dateOfJoining).getFullYear().toString().slice(-2);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${year}${randomDigits}`;
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function saveEmployees() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

function loadEmployees() {
  const savedEmployees = localStorage.getItem('employees');
  if (savedEmployees) {
      employees = JSON.parse(savedEmployees);
  }
  
  // If we're on the directory page, render the employees
  if (window.location.pathname.includes('directory.html') && document.getElementById('employeeGrid')) {
      renderEmployees(employees);
  }
}

// Global functions needed in HTML
window.showDepartmentDetails = function(deptId) {
  const department = departments.find(d => d.id === deptId);
  if (!department) return;
  
  const deptEmployees = employees.filter(emp => emp.department === department.name);
  const modal = document.getElementById('departmentModal');
  const details = document.getElementById('departmentDetails');

  deptEmployees.sort((a, b) => a.position.localeCompare(b.position));

  details.innerHTML = `
      <div class="modal-header">
          <h2>${department.name} Department</h2>
          <button class="close" onclick="closeDepartmentModal()">&times;</button>
      </div>
      <div class="department-info">
          <img src="${department.image}" alt="${department.name}">
          <p>${department.description}</p>
          <h3>Team Members (${deptEmployees.length})</h3>
          <div class="employee-list">
              ${deptEmployees.map(emp => `
                  <div class="employee-item">
                      <img src="${emp.image}" alt="${emp.name}">
                      <div class="employee-info">
                          <h4>${emp.name}</h4>
                          <p>${emp.position}</p>
                      </div>
                  </div>
              `).join('')}
          </div>
      </div>
  `;

  modal.style.display = 'block';
};

window.closeDepartmentModal = function() {
  document.getElementById('departmentModal').style.display = 'none';
};

// Search functionality for employees
const employeeSearch = document.getElementById('employeeSearch');
if (employeeSearch) {
    employeeSearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const employeeCards = document.querySelectorAll('.employee-card');
        let hasResults = false;
        
        employeeCards.forEach(card => {
            const cardFront = card.querySelector('.card-inner .card-front');
            const name = cardFront.querySelector('h3').textContent.toLowerCase();
            const department = cardFront.querySelector('p').textContent.toLowerCase();
            const cardBack = card.querySelector('.card-inner .card-back');
            const position = cardBack.querySelector('p:first-child').textContent.toLowerCase();
            const id = cardBack.querySelector('p:nth-child(2)').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || 
                department.includes(searchTerm) || 
                position.includes(searchTerm) || 
                id.includes(searchTerm)) {
                card.style.display = '';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = hasResults ? 'none' : 'block';
        }
    });
}

// Search functionality for departments
const departmentSearch = document.getElementById('departmentSearch');
if (departmentSearch) {
    departmentSearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const departmentItems = document.querySelectorAll('.department-item');
        let hasResults = false;
        
        departmentItems.forEach(item => {
            const name = item.querySelector('.department-info h3').textContent.toLowerCase();
            const description = item.querySelector('.department-info p').textContent.toLowerCase();
            const employeeCount = item.querySelector('.employee-count').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || 
                description.includes(searchTerm) || 
                employeeCount.includes(searchTerm)) {
                item.style.display = '';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = hasResults ? 'none' : 'block';
        }
    });
}

// Function to generate sample employees
function generateSampleEmployees() {
    const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance', 'Operations', 'Research', 'IT Support'];
    const positions = {
        'Engineering': ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'QA Engineer'],
        'Marketing': ['Marketing Specialist', 'Content Writer', 'Social Media Manager', 'Brand Manager', 'SEO Specialist'],
        'Sales': ['Sales Representative', 'Account Manager', 'Sales Coordinator', 'Business Development', 'Sales Analyst'],
        'Human Resources': ['HR Coordinator', 'Recruiter', 'HR Manager', 'Training Specialist', 'HR Assistant'],
        'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager', 'Payroll Specialist', 'Budget Analyst'],
        'Operations': ['Operations Manager', 'Project Coordinator', 'Business Analyst', 'Process Manager', 'Operations Assistant'],
        'Research': ['Research Analyst', 'Data Scientist', 'Research Coordinator', 'Lab Manager', 'Research Assistant'],
        'IT Support': ['IT Support Specialist', 'System Administrator', 'Network Engineer', 'Help Desk Technician', 'IT Coordinator']
    };

    const additionalEmployees = [];
    for (let i = 11; i <= 100; i++) {
        const department = departments[Math.floor(Math.random() * departments.length)];
        const position = positions[department][Math.floor(Math.random() * positions[department].length)];
        const gender = Math.random() < 0.5 ? 'men' : 'women';
        const firstName = Math.random() < 0.5 ? 'John' : 'Jane';
        const lastName = `Doe${i}`;
        
        additionalEmployees.push({
            id: `EMP${i.toString().padStart(3, '0')}`,
            name: `${firstName} ${lastName}`,
            position: position,
            department: department,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@techcorp.com`,
            phone: `(555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
            joinDate: `2021-${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}`,
            image: `https://randomuser.me/api/portraits/${gender}/${i}.jpg`
        });
    }
    
    return [...sampleEmployees, ...additionalEmployees];
}

// Update the initialization function
function initializeEmployeeData() {
    const storedEmployees = localStorage.getItem('employees');
    if (!storedEmployees) {
        const allEmployees = generateSampleEmployees();
        localStorage.setItem('employees', JSON.stringify(allEmployees));
    }
    return JSON.parse(localStorage.getItem('employees'));
}

// Function to render employee cards
function renderEmployeeCards(employees) {
    const employeeGrid = document.getElementById('employeeGrid');
    if (!employeeGrid) return;

    employeeGrid.innerHTML = '';
    
    employees.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${employee.image}" alt="${employee.name}">
                    <h3>${employee.name}</h3>
                    <p>${employee.department}</p>
                </div>
                <div class="card-back">
                    <p>${employee.position}</p>
                    <p>ID: ${employee.id}</p>
                    <p>Email: ${employee.email}</p>
                    <p>Phone: ${employee.phone}</p>
                    <p>Joined: ${formatDate(employee.joinDate)}</p>
                    <div class="card-actions">
                        <button class="btn-primary" onclick="editEmployee('${employee.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-danger" onclick="deleteEmployee('${employee.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
        employeeGrid.appendChild(card);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const employees = initializeEmployeeData();
    renderEmployeeCards(employees);
    initializeSearch();
    initializeSort();
    initializeThemeToggle();
    initializeLogin();
    initializeAddEmployeeForm();
});

// Function to add a new employee
function addEmployee(employeeData) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    employees.push(employeeData);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployeeCards(employees);
}

// Function to edit an existing employee
function editEmployee(employeeId) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        // Populate the edit form
        document.getElementById('empFirstName').value = employee.name.split(' ')[0];
        document.getElementById('empLastName').value = employee.name.split(' ')[1] || '';
        document.getElementById('empDept').value = employee.department;
        document.getElementById('empPosition').value = employee.position;
        document.getElementById('empJoinDate').value = employee.joiningDate;
        document.getElementById('empImage').value = employee.image;
        
        // Show the modal
        const modal = document.getElementById('addEmployeeModal');
        modal.classList.add('show');
        
        // Update form submission handler
        const form = document.getElementById('addEmployeeForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            const updatedEmployee = {
                ...employee,
                name: `${document.getElementById('empFirstName').value} ${document.getElementById('empLastName').value}`.trim(),
                department: document.getElementById('empDept').value,
                position: document.getElementById('empPosition').value,
                joinDate: document.getElementById('empJoinDate').value,
                image: document.getElementById('empImage').value
            };
            updateEmployee(employeeId, updatedEmployee);
            modal.classList.remove('show');
        };
    }
}

// Function to update an employee
function updateEmployee(employeeId, updatedData) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const index = employees.findIndex(emp => emp.id === employeeId);
    if (index !== -1) {
        employees[index] = updatedData;
        localStorage.setItem('employees', JSON.stringify(employees));
        renderEmployeeCards(employees);
    }
}

// Function to delete an employee
function deleteEmployee(employeeId) {
    if (confirm('Are you sure you want to delete this employee?')) {
        const employees = JSON.parse(localStorage.getItem('employees'));
        const filteredEmployees = employees.filter(emp => emp.id !== employeeId);
        localStorage.setItem('employees', JSON.stringify(filteredEmployees));
        renderEmployeeCards(filteredEmployees);
    }
}

// Function to generate a unique employee ID
function generateEmployeeId() {
    return 'EMP' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

// Initialize the add employee form
function initializeAddEmployeeForm() {
    const addButton = document.getElementById('addEmployeeBtn');
    const modal = document.getElementById('addEmployeeModal');
    const form = document.getElementById('addEmployeeForm');
    const closeBtn = document.getElementById('closeAddForm');

    if (addButton) {
        addButton.addEventListener('click', () => {
            form.reset();
            modal.classList.add('show');
            // Reset form submission handler
            form.onsubmit = (e) => {
                e.preventDefault();
                const newEmployee = {
                    id: generateEmployeeId(),
                    name: `${document.getElementById('empFirstName').value} ${document.getElementById('empLastName').value}`.trim(),
                    department: document.getElementById('empDept').value,
                    position: document.getElementById('empPosition').value,
                    joinDate: document.getElementById('empJoinDate').value,
                    image: document.getElementById('empImage').value || 'https://randomuser.me/api/portraits/lego/1.jpg',
                    email: `${document.getElementById('empFirstName').value.toLowerCase()}.${document.getElementById('empLastName').value.toLowerCase()}@techcorp.com`,
                    phone: "(555) 000-0000"
                };
                addEmployee(newEmployee);
                modal.classList.remove('show');
            };
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
}