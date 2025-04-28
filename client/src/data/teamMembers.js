const experienceYear = new Date().getFullYear() - 2024;
console.log(experienceYear);


const teamMembers = [
    {
      id: 1,
      name: 'Trần Minh Phú',
      position: 'Sinh viên',
      bio: `Chuyên gia công nghệ với ${experienceYear} năm kinh nghiệm trong lĩnh vực IT`,
      image: './public/assets/images/backgrounds/about/profile-bg-tranminhphu.png'
    },
    // {
    //   id: 2,
    //   name: 'Trần Thị B',
    //   position: 'CTO',
    //   bio: 'Phát triển hệ thống công nghệ với niềm đam mê thể thao',
    //   image: '/images/team-2.jpg'
    // },
    // {
    //   id: 3,
    //   name: 'Lê Văn C',
    //   position: 'Trưởng phòng Kinh doanh',
    //   bio: 'Kết nối và phát triển mạng lưới đối tác sân thể thao',
    //   image: '/images/team-3.jpg'
    // },
    // {
    //   id: 4,
    //   name: 'Phạm Thị D',
    //   position: 'Trưởng phòng CSKH',
    //   bio: 'Đảm bảo trải nghiệm tốt nhất cho người dùng',
    //   image: '/images/team-4.jpg'
    // }
  ];
  
  export default teamMembers;