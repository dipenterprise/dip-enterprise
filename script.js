// Default Data
const defaultData = {
    title: "Dip Enterprise, CSC & Cyber Cafe",
    subtitle: "দ্বীপ এন্টারপ্রাইজ সিএসসি এবং সাইবার ক্যাফে",
    phone: "+91 9735961719",
    whatsapp: "9432776461",
    address: "Aranghata Road, Vill-Panikhali, Po-Daluabari, Ps-Dhantala, Ranaghat II, Nadia, WB-741504",
    services: [
        { icon: "fa-id-card", title: "CSC & Digital Services", desc: "প্যান কার্ড, ভোটার কার্ড, আয়ুষ্মান কার্ড এবং সমস্ত সরকারি শংসাপত্র তৈরি।" },
        { icon: "fa-laptop-code", title: "Online Form Fill-up", desc: "স্কুল-কলেজ ভর্তি, চাকরির ফর্ম ফিলাপ ও পরীক্ষার আবেদন।" },
        { icon: "fa-print", title: "Print, Xerox & Lamination", desc: "কালার ও ব্ল্যাক অ্যান্ড হোয়াইট প্রিন্ট, জেরক্স, ল্যামিনেশন ও স্পাইরাল বাইন্ডিং।" },
        { icon: "fa-money-bill-transfer", title: "AEPS & Money Transfer", desc: "আধার কার্ডের মাধ্যমে টাকা তোলা, জমা ও যেকোনো ব্যাংকে মানি ট্রান্সফার।" },
        { icon: "fa-train", title: "Ticket Booking", desc: "রেল টিকিট (IRCTC), বাস এবং বিমান টিকিট বুকিং।" },
        { icon: "fa-file-invoice-dollar", title: "Bill Payments", desc: "বিদ্যুৎ বিল, মোবাইল রিচার্জ এবং ডিটিএইচ (DTH) রিচার্জ।" }
    ]
};

// Load data from LocalStorage or use Default
let siteData = JSON.parse(localStorage.getItem('dipEnterpriseData')) || JSON.parse(JSON.stringify(defaultData));

function renderWebsite() {
    document.getElementById('site-title').innerText = siteData.title;
    document.getElementById('site-subtitle').innerText = siteData.subtitle;
    document.getElementById('top-phone').innerText = siteData.phone;
    document.getElementById('top-whatsapp').innerText = siteData.whatsapp;
    document.getElementById('contact-name').innerText = siteData.title;
    document.getElementById('contact-address').innerText = siteData.address;
    document.getElementById('contact-call').innerText = siteData.phone;
    document.getElementById('contact-whatsapp').innerText = siteData.whatsapp;
    
    const cleanPhone = siteData.phone.replace(/\s+/g, '');
    document.getElementById('call-btn').href = "tel:" + cleanPhone;
    
    const cleanWa = siteData.whatsapp.replace(/[^0-9]/g, '');
    const waFormatted = cleanWa.length === 10 ? '91' + cleanWa : cleanWa;
    document.getElementById('wa-btn').href = "https://wa.me/" + waFormatted;

    // Render Public Services Grid
    let servicesContainer = document.getElementById('services-grid');
    servicesContainer.innerHTML = '';
    siteData.services.forEach(service => {
        servicesContainer.innerHTML += `
            <div class="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-purple-500 hover:shadow-xl transition transform hover:-translate-y-1">
                <div class="text-3xl text-purple-600 mb-4"><i class="fa-solid ${service.icon}"></i></div>
                <h3 class="text-xl font-bold mb-2 text-gray-800">${service.title}</h3>
                <p class="text-gray-600 text-sm">${service.desc}</p>
            </div>
        `;
    });
}

// Render Services inside Admin Panel
function renderAdminServices() {
    const adminList = document.getElementById('admin-services-list');
    adminList.innerHTML = '';

    if (siteData.services.length === 0) {
        adminList.innerHTML = `<p class="text-sm text-gray-500 italic">কোনো সার্ভিস নেই। ওপর থেকে নতুন সার্ভিস যোগ করুন।</p>`;
        return;
    }

    siteData.services.forEach((service, index) => {
        adminList.innerHTML += `
            <div class="flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                        <i class="fa-solid ${service.icon}"></i>
                    </div>
                    <div>
                        <p class="font-bold text-sm text-gray-800">${service.title}</p>
                        <p class="text-xs text-gray-500">${service.desc}</p>
                    </div>
                </div>
                <button type="button" onclick="deleteService(${index})" class="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-600 transition cursor-pointer" title="Delete Service">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        `;
    });
}

// Add a New Service
function addService() {
    const icon = document.getElementById('new-service-icon').value;
    const title = document.getElementById('new-service-title').value.trim();
    const desc = document.getElementById('new-service-desc').value.trim();

    if (!title || !desc) {
        alert("অনুগ্রহ করে সার্ভিসের নাম এবং বিবরণ উভয়ই লিখুন!");
        return;
    }

    siteData.services.push({ icon, title, desc });
    localStorage.setItem('dipEnterpriseData', JSON.stringify(siteData));

    // Clear inputs
    document.getElementById('new-service-title').value = '';
    document.getElementById('new-service-desc').value = '';

    renderWebsite();
    renderAdminServices();
    alert("নতুন সার্ভিস সফলভাবে যোগ করা হয়েছে!");
}

// Delete a Service
function deleteService(index) {
    if (confirm(`আপনি কি নিশ্চিতভাবে "${siteData.services[index].title}" সার্ভিসটি ডিলিট করতে চান?`)) {
        siteData.services.splice(index, 1);
        localStorage.setItem('dipEnterpriseData', JSON.stringify(siteData));
        renderWebsite();
        renderAdminServices();
    }
}

function openAdminModal() {
    let pass = prompt("Enter Admin Password (default is 1234):");
    if (pass === "1234") {
        document.getElementById('edit-title').value = siteData.title;
        document.getElementById('edit-subtitle').value = siteData.subtitle;
        document.getElementById('edit-phone').value = siteData.phone;
        document.getElementById('edit-whatsapp').value = siteData.whatsapp;
        document.getElementById('edit-address').value = siteData.address;
        
        renderAdminServices();
        document.getElementById('admin-modal').classList.remove('hidden');
    } else if (pass !== null) {
        alert("Incorrect Password!");
    }
}

function closeAdminModal() {
    document.getElementById('admin-modal').classList.add('hidden');
}

function saveChanges(event) {
    event.preventDefault();
    siteData.title = document.getElementById('edit-title').value;
    siteData.subtitle = document.getElementById('edit-subtitle').value;
    siteData.phone = document.getElementById('edit-phone').value;
    siteData.whatsapp = document.getElementById('edit-whatsapp').value;
    siteData.address = document.getElementById('edit-address').value;

    localStorage.setItem('dipEnterpriseData', JSON.stringify(siteData));
    renderWebsite();
    alert("সাধারণ তথ্য সফলভাবে সেভ হয়েছে!");
}

// Reset to Default Data
function resetToDefault() {
    if (confirm("আপনি কি সব পরিবর্তন মুছে ফেলে আগের ডিফল্ট অবস্থায় ফিরে যেতে চান?")) {
        localStorage.removeItem('dipEnterpriseData');
        siteData = JSON.parse(JSON.stringify(defaultData));
        renderWebsite();
        renderAdminServices();
        document.getElementById('edit-title').value = siteData.title;
        document.getElementById('edit-subtitle').value = siteData.subtitle;
        document.getElementById('edit-phone').value = siteData.phone;
        document.getElementById('edit-whatsapp').value = siteData.whatsapp;
        document.getElementById('edit-address').value = siteData.address;
        alert("সব তথ্য ডিফল্ট অবস্থায় রিসেট করা হয়েছে!");
    }
}

// Initial Load
renderWebsite();
