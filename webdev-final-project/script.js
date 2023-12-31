let students = [
    { id: 1, name: "Barış", surname: "Demirel", grades: [{ courseId: 1, midTerm: 70, final: 80, grade: 76, letterGrade: 'CB' },{ courseId: 2, midTerm: 70, final: 80, grade: 76, letterGrade: 'CB' }] },
    { id: 2, name: "Barış", surname: "Manço", grades: [{ courseId: 2, midTerm: 90, final: 95, grade: 93, letterGrade: 'AA' },{ courseId: 4, midTerm: 90, final: 95, grade: 93, letterGrade: 'AA' }] },
    { id: 3, name: "Kaan", surname: "Tangöze", grades: [{ courseId: 3, midTerm: 50, final: 60, grade: 56, letterGrade: 'CC' },{ courseId: 5, midTerm: 20, final: 20, grade: 20, letterGrade: 'FF' }] },
    { id: 4, name: "Can", surname: "Kazaz", grades: [{ courseId: 6, midTerm: 50, final: 50, grade: 50, letterGrade: 'CC' }] },
    { id: 5, name: "Fırat", surname: "Tanış", grades: [{ courseId: 5, midTerm: 70, final: 60, grade: 64, letterGrade: 'CB' }] },
    { id: 6, name: "Umut", surname: "Kaya", grades: [{ courseId: 1, midTerm: 12, final: 56, grade: 38, letterGrade: 'DD' }] },
    { id: 7, name: "Toygar", surname: "Işıklı", grades: [{ courseId: 4, midTerm: 55, final: 40, grade: 46, letterGrade: 'DC' }] },
    { id: 8, name: "Can", surname: "Gox", grades: [{ courseId: 6, midTerm: 50, final: 78, grade: 67, letterGrade: 'CB' }] },
    { id: 9, name: "Emre", surname: "Fel", grades: [{ courseId: 4, midTerm: 50, final: 60, grade: 56, letterGrade: 'CC' }] },
    { id: 10, name: "Cem", surname: "Özel", grades: [{ courseId: 2, midTerm: 50, final: 60, grade: 56, letterGrade: 'CC' }] },
    { id: 11, name: "Birkan", surname: "Nasuhoğlu", grades: [{ courseId: 1, midTerm: 100, final: 100, grade: 100, letterGrade: 'AA' }] },
    { id: 12, name: "Cem", surname: "Karaca", grades: [{ courseId: 5, midTerm: 90, final: 90, grade: 90, letterGrade: 'AA' }] },
    { id: 13, name: "Mehmet Ali", surname: "Sanlıkol", grades: [{ courseId: 6, midTerm: 80, final: 80, grade: 80, letterGrade: 'BA' }] },
    { id: 14, name: "Fikret", surname: "Kızılok", grades: [{ courseId: 6, midTerm: 70, final: 70, grade: 70, letterGrade: 'BB' }] },
    { id: 15, name: "Metin", surname: "Kesik", grades: [{ courseId: 5, midTerm: 10, final: 10, grade: 10, letterGrade: 'FF' }] },
    { id: 16, name: "Bülent", surname: "Ortaçgil", grades: [{ courseId: 4, midTerm: 50, final: 60, grade: 56, letterGrade: 'CC' }] }
    // Kendim default'da bazı öğrencilerin bulunması ve öğrenilere bazı dersleri atamak için buraya birkaç örnek öğrenci girdim.
];
let courses = [
    { id: 1, name: "Computer Networks" },
    { id: 2, name: "Web Programming" },
    { id: 3, name: "Database Management" },
    { id: 4, name: "Data Mining" },
    { id: 5, name: "Academic Writing" },
    { id: 6, name: "Security" }
    // Aynı şekilde örnek dersler girdim.
];
let studentIdCounter = 17;
let courseIdCounter = 7;

function addCourse() {
    let courseName = document.getElementById('courseName').value;
    let newCourse = { id: courseIdCounter++, name: courseName };
    courses.push(newCourse);
    updateCourseSelect();
    document.getElementById('courseName').value = '';
    // Course ekleme işleminde course ismini giriyoruz ve add butonuna bastıktan sonra course'lar için sıradaki id yi atayıp ekliyor.
}

function addStudent() {
    let id = parseInt(document.getElementById('studentId').value);
    if (students.some(s => s.id === id)) {
        alert("Bu ID zaten kullanımda. Lütfen başka bir ID girin.");
        return; //Öğrenciler için 4 kısmı dolduruyoruz. Bunlardan biri de ID kısmı. Önceden seçili ID girdiğimizde izin vermemesi için.
    }
    let name = document.getElementById('studentName').value; // İsim giriliyor
    let surname = document.getElementById('studentSurname').value; // Soy isim giriliyor
    let newStudent = { id, name, surname, grades: [] }; // Yeni öğrenciyi oluşturup kaydediyor
    students.push(newStudent);
    updateStudentSelect();
    document.getElementById('studentId').value = ''; 
    document.getElementById('studentName').value = ''; 
    document.getElementById('studentSurname').value = ''; // Ekleme işleminin ardından temizliyor boşlukları
}

function enrollStudentToCourse() { //Öğrenciye ders atama kısmı
    let selectedCourseId = parseInt(document.getElementById('courseSelect').value);
    let selectedStudentId = parseInt(document.getElementById('studentSelect').value);
    let midTerm = parseInt(document.getElementById('midTermGrade').value);
    let final = parseInt(document.getElementById('finalGrade').value);
    
    if (isNaN(selectedCourseId) || isNaN(selectedStudentId) || isNaN(midTerm) || isNaN(final)) {
        alert("Lütfen tüm alanları doğru doldurun.");
        return; // Aslında daha çok not kısımları dışında doğru girildi mi diye kontrol ediyor
    }

    if (midTerm < 0 || midTerm > 100 || final < 0 || final > 100) {
        alert("Notlar 0 ile 100 arasında olmalıdır.");
        return; // 0-100 arası mı diye kontrol ediyor
    }
    

    let student = students.find(s => s.id === selectedStudentId);
    if (!student) {
        alert("Geçerli bir öğrenci seçtiğinizden emin olun.");
        return; // Seçilen öğrenci yoksa hata fırlatıyor
    }
    if (student.grades.some(grade => grade.courseId === selectedCourseId)) {
        alert("Bu öğrenci zaten bu derse kayıtlı.");
        return; //Halihazırda eklenmek istenen derse kayıtlı öğrenciyi tekrar eklemene izin vermiyor
    }
    let grade = calculateGrade(midTerm, final); // Vize (40%) ve Final (60%) hesaplayıp veriyor
    let letterGrade = calculateLetterGrade(grade); // Harf notu karşılığı
    student.grades.push({ courseId: selectedCourseId, midTerm, final, grade, letterGrade });
    
    updateStudentsSection(); // Öğrenciler sekmesini güncelleme
    updateCoursesSection(); // Dersler sekmesini güncelleme
    document.getElementById('midTermGrade').value = '';
    document.getElementById('finalGrade').value = '';
}

function calculateGrade(midTerm, final) { // Not hesaplama
    return midTerm * 0.4 + final * 0.6;
}

function calculateLetterGrade(grade) { // 10'luk sistemde not hesaplıyor
    if (grade >= 90) return 'AA';
    if (grade >= 80) return 'BA';
    if (grade >= 70) return 'BB';
    if (grade >= 60) return 'CB';
    if (grade >= 50) return 'CC';
    if (grade >= 40) return 'DC';
    if (grade >= 30) return 'DD';
    return 'FF';
}

function convertToSevenScale(grade) { // Burası da 7'lik sistemde hesaplıyor
    if (grade >= 94) return 'AA';
    if (grade >= 88) return 'BA';
    if (grade >= 77) return 'BB';
    if (grade >= 65) return 'CB';
    if (grade >= 54) return 'CC';
    if (grade >= 42) return 'CD';
    if (grade >= 30) return 'DD';
    return 'FF';
}

function updateCourseSelect() { // Ders sekmesini herhangi bir aksiyondan sonra güncellemek için
    let select = document.getElementById('courseSelect');
    select.innerHTML = courses.map(course => `<option value="${course.id}">${course.name}</option>`).join('');
    if (courses.length === 0) {
        select.innerHTML = "<option value=''>Ders bulunamadı</option>";
    }
}

function updateStudentSelect() { // Ders sekmesini herhangi bir aksiyondan sonra güncellemek için
    let select = document.getElementById('studentSelect');
    select.innerHTML = students.map(student => `<option value="${student.id}">${student.name} ${student.surname}</option>`).join('');
    if (students.length === 0) {
        select.innerHTML = "<option value=''>Öğrenci bulunamadı</option>";
    }
}

function updateGradeTable() { 
    let table = document.getElementById('gradeTable');
    table.innerHTML = '<h2>Notlar</h2>';
    students.forEach(student => {
        if (student.grades.length > 0) {
            let gradesList = student.grades.map(grade => {
                let course = courses.find(c => c.id === grade.courseId);
                return `<p>${course.name}: ${grade.grade} (${grade.letterGrade})</p>`;
            }).join('');
            table.innerHTML += `<div><h3>${student.name} ${student.surname}</h3>${gradesList}</div>`;
        }
    });
}

// Başlangıçtaki ders ve öğrenci seçeneklerini güncellemek için
document.addEventListener('DOMContentLoaded', () => {
    updateCourseSelect();
    updateStudentSelect();
    updateCoursesSection();
    updateStudentsSection();
});

function showSection(sectionId) {
    // Tüm bölümleri gizleme amacıyla var
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none';
    });

    // Ardından seçilen bölümü gösteriyor
    document.getElementById(sectionId + 'Section').style.display = 'block';

    // İlgili verileri güncelliyor
    if (sectionId === 'courses') {
        updateCoursesSection();
    } else if (sectionId === 'students') {
        updateStudentsSection();
    }
}

function updateCoursesSection() { // Course kısmını güncellemek için
    let section = document.getElementById('coursesSection');
    section.innerHTML = '<h2>Dersler</h2>';
    courses.forEach(course => {
        let enrolledStudents = students.filter(student => student.grades.some(grade => grade.courseId === course.id));
        let totalGrades = 0;
        let passCount = 0;
        let failCount = 0; // Buraya kadar olan kısım ortalama notu, geçen öğrenci ve kalan öğrenci sayısını gösteriyor
        enrolledStudents.forEach(student => {
            let gradeInfo = student.grades.find(grade => grade.courseId === course.id);
            if (gradeInfo) {
                totalGrades += gradeInfo.grade;
                if (gradeInfo.grade >= 30) {
                    passCount++; // Notu 30'un üstünde olanlar geçiyor
                } else {
                    failCount++; // Altında kalanlar kalıyor
                }
            }
        });
        let averageGrade = enrolledStudents.length > 0 ? (totalGrades / enrolledStudents.length).toFixed(2) : "N/A";
        section.innerHTML += `
            <div>
                <h3>${course.name}</h3>
                <p>Dersi Alan Öğrenci Sayısı: ${enrolledStudents.length}</p>
                <p>Geçenler: ${passCount}, Kalanlar: ${failCount}</p>
                <p>Not Ortalaması: ${averageGrade}</p>
            </div>`;

        let studentDetails = enrolledStudents.map(student => { // Burası da deresi alan öğrencileri gösteriyor
            let gradeInfo = student.grades.find(grade => grade.courseId === course.id);
            if (!gradeInfo) return ''; //Not bilgisi yoksa veya alamadıysa boş döndürüyor
            return `<p>ID: ${student.id}, İsim: ${student.name}, Soyisim: ${student.surname}, Vize: ${gradeInfo.midTerm}, Final: ${gradeInfo.final}</p>`;
        }).join('');
        section.innerHTML += `<div><h3>${course.name} dersini alanlar:</h3>${studentDetails || 'Bu derse hiç öğrenci kayıtlı değil.'}</div>`;
        section.innerHTML += `<button onclick="deleteCourse(${course.id})"> ${course.name} Dersini Sil</button>`;

    });
}

function updateStudentsSection() { // Öğrenci kısmını güncellemek için
    if (document.getElementById('coursesSection').style.display !== 'none') {
        updateCoursesSection(); // Eğer 'Courses' sekmesi açıksa güncellesin
    }
    let section = document.getElementById('studentsSection');
    section.innerHTML = '<h2>Öğrenciler</h2>';
    students.forEach(student => {
        let studentCourses = student.grades.map(gradeInfo => {
            let course = courses.find(c => c.id === gradeInfo.courseId);
            let grade = gradeInfo.grade;
            let sevenScaleGrade = convertToSevenScale(grade);
            let letterGrade = calculateLetterGrade(grade); // Benzer şekilde eklenen öğrencinin değerlerini alıyor ve bu kısmı ona göre güncelliyor
            return `<p>${course.name}: Notu: ${grade}, 7'lik Sistemde Harf Notu: ${sevenScaleGrade}, 10'luk Sistemde Harf Notu: ${letterGrade}</p>`;
        }).join('');
        section.innerHTML += `<div><h3>${student.name} ${student.surname}</h3>${studentCourses || 'Bu öğrenci hiç ders almamış.'}</div>`;
        section.innerHTML += `<button onclick="deleteStudent(${student.id})"> ${student.name} adlı öğrenciyi Sil</button>`;
    });
    updateGradeTable(); // Notlar tablosunu güncelledik
}

function deleteCourse(courseId) { // Dersi siliyor
    courses = courses.filter(course => course.id !== courseId);
    students.forEach(student => {  // Dersi alan öğrencilerden bu dersi kaldır.
        student.grades = student.grades.filter(grade => grade.courseId !== courseId);
    });
    updateCoursesSection();
    updateCourseSelect();
    updateStudentSelect();
      // Ders seçimlerini güncelle
}

function deleteStudent(studentId) { // Öğrenciyi siliyor
    students = students.filter(student => student.id !== studentId);
    updateStudentsSection();
    updateStudentSelect();
    updateCourseSelect();  
      // Öğrenci seçimlerini güncelle
}

// En Başta "Adding Processes" bölümünü göstersin
document.addEventListener('DOMContentLoaded', () => {
    showSection('addingProcesses');
});
