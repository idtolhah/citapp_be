const people = [
    {
        id: 1,
        name: "Tolhah Aminuddin",
        job: "Digital Engineer",
        place: "PT. SMART, Tbk.",
        category_id: 1,
        status: 1,
        steps: [
            {
                title: "Sekolah SMK Jurusan TKJ",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Kuliah Jurusan Ilmu Komputer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Freelance Web Developer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Kuliah Jurusan TKJMD",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Magang di Kampus",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Kuliah Jurusan Media Digital & Game",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Magang di STMIK",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Kerja Sebagai Backend Programmer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 2,
        name: "Galih",
        job: "Digital Engineer",
        place: "PT. SMART, Tbk.",
        category_id: 1,
        status: 1,
        steps: [
            {
                title: "Bootcamp di Hacktiv",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Otak atik program tiap malam",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Melamar kerja sebagai Digital Engineer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 3,
        name: "Rizki",
        job: "Senior Fullstack Developer",
        place: "PT. SMART, Tbk.",
        category_id: 1,
        status: 1,
        steps: [
            {
                title: "Kuliah Jurusan IT",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Magang di Perusahaan Swasta",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi Junior",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi Senior Fullstack Developer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 4,
        name: "Willy",
        job: "UI/UX Designer",
        place: "PT. SMART, Tbk.",
        category_id: 2,
        status: 1,
        steps: [
            {
                title: "Kuliah DKV",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Magang di Perusahaan Swasta",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi UI/IX Designer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 5,
        name: "Akbar",
        job: "Product Designer",
        place: "Salam Ganesha, PelajarInfo.id",
        category_id: 2,
        status: 1,
        steps: [
            {
                title: "Kuliah Jurusan Desain Produk",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi Junior Desainer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Mencoba Bekerja di Beberapa Perusahaan Swasta",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Membangun Start-Up Sendiri",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 6,
        name: "Yulia Yustikasari",
        job: "Dosen FEB",
        place: "Universitas Mercubuana",
        category_id: 3,
        status: 1,
        steps: [
            {
                title: "Kuliah S1 Jurusan Ekonomi & Bisnis",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi Asisten Dosen",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Kuliah S2 Jurusan Ekonomi & Bisnis (Linear)",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi Dosen di Tegal",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi Dosen di Univ. Mercubuana Jakarta",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 7,
        name: "Aristyo",
        job: "Dosen FTI",
        place: "Telkom University",
        category_id: 3,
        status: 1,
        steps: [
            {
                title: "Kuliah Jurusan Teknik Komputer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Otak atik Alat dan Program",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Kuliah Sambil Bekerja",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menjadi Project Manager",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Sambil Mengajar Sebagai Dosen",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 8,
        name: "Jefri Andhika",
        job: "Civil Architect",
        place: "PT. Jaya Arsitektur Indonesia.",
        category_id: 4,
        status: 1,
        steps: [
            {
                title: "Kuliah Jurusan Arsitektur",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Sering Latihan Menggambar Lewat Komputer",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Mendirikan Perusahaan Sendiri",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 9,
        name: "Grand Zah Putra",
        job: "Project Manager",
        place: "PT. SMART, Tbk.",
        category_id: 5,
        status: 1,
        steps: [
            {
                title: "Kuliah Jurusan IT",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Bekerja di Perusahaan Swasta Sebagai System Analyst",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Mendapatkan Sertifikasi PMO",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Bekerja di Perusahaan Swasta Sebagai Project Manager",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 10,
        name: "Ginanjar Sulistio",
        job: "Pengusaha Konter HP",
        place: "Agen Lion Parcel",
        category_id: 6,
        status: 1,
        steps: [
            {
                title: "Kerja di Perusahaan Swasta",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Menikah",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Pindah Kerja di Tempat Yang Gaji Lebih Besar",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Mengumpulkan Uang",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Membuka Usaha Sambil Bekerja",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
    {
        id: 11,
        name: "Indita Intan Perdana",
        job: "Customer Service Operation",
        place: "RupaRupa.com",
        category_id: 7,
        status: 1,
        steps: [
            {
                title: "Kuliah Semua Jurusan",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Ikut Organisasi",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
            {
                title: "Melamar Lowongan Customer Service",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            },
        ]
    },
]

export default people;