// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const section = item.dataset.section;
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(section).classList.add('active');
        
        if (section === 'map') {
            setTimeout(() => mainMap.invalidateSize(), 100);
        }
    });
});

// Sample hotspots data
const hotspotsData = [
    { rank: 1, location: 'Minto Bridge', ward: 'Connaught Place', severity: 'Critical', depth: '2.5 ft', status: 'Active' },
    { rank: 2, location: 'ITO Junction', ward: 'ITO', severity: 'High', depth: '1.8 ft', status: 'Monitoring' },
    { rank: 3, location: 'Pul Prahladpur', ward: 'Pul Prahladpur', severity: 'High', depth: '1.5 ft', status: 'Active' },
    { rank: 4, location: 'Azadpur Underpass', ward: 'Azadpur', severity: 'Moderate', depth: '1.2 ft', status: 'Monitoring' },
    { rank: 5, location: 'Moolchand Underpass', ward: 'Moolchand', severity: 'High', depth: '1.6 ft', status: 'Active' },
    { rank: 6, location: 'Zakhira Underpass', ward: 'Zakhira', severity: 'Moderate', depth: '1.0 ft', status: 'Monitoring' },
    { rank: 7, location: 'Dhaula Kuan', ward: 'Dhaula Kuan', severity: 'Critical', depth: '2.2 ft', status: 'Active' },
    { rank: 8, location: 'Tilak Bridge', ward: 'Tilak Nagar', severity: 'High', depth: '1.7 ft', status: 'Active' },
    { rank: 9, location: 'Anand Vihar', ward: 'Anand Vihar', severity: 'Moderate', depth: '0.9 ft', status: 'Resolved' },
    { rank: 10, location: 'Mayur Vihar', ward: 'Mayur Vihar', severity: 'Moderate', depth: '1.1 ft', status: 'Monitoring' }
];

// Populate hotspots table
const tbody = document.getElementById('hotspots-tbody');
hotspotsData.forEach(spot => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><strong>#${spot.rank}</strong></td>
        <td>${spot.location}</td>
        <td>${spot.ward}</td>
        <td><span class="severity-badge ${spot.severity.toLowerCase()}">${spot.severity}</span></td>
        <td>${spot.depth}</td>
        <td><span class="status-badge ${spot.status.toLowerCase()}">${spot.status}</span></td>
        <td><button class="btn-text">View Details</button></td>
    `;
    tbody.appendChild(row);
});

// Initialize Maps
let previewMap, mainMap;

// Preview Map
setTimeout(() => {
    previewMap = L.map('preview-map').setView([28.6139, 77.2090], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(previewMap);
    
    addHotspotMarkers(previewMap);
}, 500);

// Main Map
const mainMapElement = document.getElementById('main-map');
if (mainMapElement) {
    mainMap = L.map('main-map').setView([28.6139, 77.2090], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mainMap);
    
    addHotspotMarkers(mainMap);
}

// Add hotspot markers to map
function addHotspotMarkers(map) {
    const locations = [
        { name: 'Minto Bridge', coords: [28.6289, 77.2065], severity: 'critical' },
        { name: 'ITO Junction', coords: [28.6289, 77.2490], severity: 'high' },
        { name: 'Pul Prahladpur', coords: [28.4895, 77.2707], severity: 'high' },
        { name: 'Azadpur', coords: [28.7041, 77.1750], severity: 'moderate' },
        { name: 'Moolchand', coords: [28.5706, 77.2514], severity: 'high' },
        { name: 'Zakhira', coords: [28.6517, 77.1640], severity: 'moderate' },
        { name: 'Dhaula Kuan', coords: [28.5933, 77.1625], severity: 'critical' },
        { name: 'Tilak Bridge', coords: [28.6139, 77.2490], severity: 'high' },
        { name: 'Anand Vihar', coords: [28.6469, 77.3158], severity: 'moderate' },
        { name: 'Mayur Vihar', coords: [28.6079, 77.2983], severity: 'moderate' }
    ];
    
    locations.forEach(loc => {
        const color = loc.severity === 'critical' ? '#dc2626' : 
                     loc.severity === 'high' ? '#f59e0b' : '#3b82f6';
        
        const marker = L.circleMarker(loc.coords, {
            radius: 10,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        marker.bindPopup(`
            <div style="padding: 0.5rem;">
                <h4 style="margin-bottom: 0.5rem; font-weight: 600;">${loc.name}</h4>
                <p style="margin: 0; color: #64748b; font-size: 0.9rem;">
                    Severity: <span style="color: ${color}; font-weight: 600;">${loc.severity.toUpperCase()}</span>
                </p>
            </div>
        `);
    });
}

// Populate hotspots grid
const hotspotsGrid = document.querySelector('.hotspots-grid');
if (hotspotsGrid) {
    hotspotsData.slice(0, 6).forEach(spot => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <h3 style="font-size: 1.1rem;">${spot.location}</h3>
                <span class="severity-badge ${spot.severity.toLowerCase()}">${spot.severity}</span>
            </div>
            <p style="color: #64748b; margin-bottom: 1rem;">Ward: ${spot.ward}</p>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <div>
                    <p style="font-size: 0.85rem; color: #94a3b8;">Water Depth</p>
                    <p style="font-weight: 600; font-size: 1.1rem;">${spot.depth}</p>
                </div>
                <div>
                    <p style="font-size: 0.85rem; color: #94a3b8;">Status</p>
                    <span class="status-badge ${spot.status.toLowerCase()}">${spot.status}</span>
                </div>
            </div>
            <button class="btn-primary" style="width: 100%;">View Details</button>
        `;
        hotspotsGrid.appendChild(card);
    });
}

// Risk zones for predictions
const riskZones = document.querySelector('.risk-zones');
if (riskZones) {
    const zones = [
        { name: 'Central Delhi', risk: 'High', probability: '85%' },
        { name: 'South Delhi', risk: 'Moderate', probability: '60%' },
        { name: 'North Delhi', risk: 'High', probability: '75%' },
        { name: 'East Delhi', risk: 'Moderate', probability: '55%' },
        { name: 'West Delhi', risk: 'Low', probability: '30%' }
    ];
    
    zones.forEach(zone => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 1rem; background: #f8fafc; border-radius: 12px;';
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="font-weight: 600; margin-bottom: 0.25rem;">${zone.name}</h4>
                    <p style="font-size: 0.9rem; color: #64748b;">Risk Level: ${zone.risk}</p>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 1.5rem; font-weight: 700; color: #3b82f6;">${zone.probability}</p>
                    <p style="font-size: 0.8rem; color: #94a3b8;">Probability</p>
                </div>
            </div>
        `;
        riskZones.appendChild(item);
    });
}

// Charts
if (typeof Chart !== 'undefined') {
    // Forecast Chart
    const forecastCtx = document.getElementById('forecast-chart');
    if (forecastCtx) {
        new Chart(forecastCtx, {
            type: 'line',
            data: {
                labels: ['Now', '3h', '6h', '9h', '12h', '15h', '18h', '21h', '24h'],
                datasets: [{
                    label: 'Predicted Hotspots',
                    data: [12, 15, 18, 22, 28, 25, 20, 16, 14],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
    
    // Trends Chart
    const trendsCtx = document.getElementById('trends-chart');
    if (trendsCtx) {
        new Chart(trendsCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Water-logging Incidents',
                    data: [5, 8, 12, 15, 20, 45, 78, 82, 65, 35, 18, 10],
                    backgroundColor: '#3b82f6'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
    
    // Ward Chart
    const wardCtx = document.getElementById('ward-chart');
    if (wardCtx) {
        new Chart(wardCtx, {
            type: 'doughnut',
            data: {
                labels: ['Central', 'South', 'North', 'East', 'West'],
                datasets: [{
                    data: [30, 20, 25, 15, 10],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Form submission
const reportForm = document.querySelector('.report-form');
if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your report! Our team will investigate this location.');
        reportForm.reset();
    });
}

console.log('Delhi Water Watch - System Initialized');
