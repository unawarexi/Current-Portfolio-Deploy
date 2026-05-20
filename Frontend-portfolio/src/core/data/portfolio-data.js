// Array of project data
const projects = [
    {
      id: 1,
      title: "Django Ecommerce",
      description:
        "A robust full-stack ecommerce platform built with Django, featuring seamless user authentication, integrated mailing systems, and real-time inventory and order updates.",
      image:
        "https://cdn.dribbble.com/userupload/10640469/file/still-a721a0ced00c365bd926e72a593adb1d.png",
      video:
        "https://cdn.dribbble.com/userupload/10640472/file/original-c81c56245856e105c75424cf9a958366.mp4",
    },
    {
      id: 2,
      title: "Flutter Ecommerce",
      description:
        "A modern mobile ecommerce application developed with Flutter, offering intuitive shopping experiences, real-time product updates, and efficient state management.",
      image:
        "https://cdn.dribbble.com/userupload/17919100/file/original-4040769ee756ae0a166b1cedb84e9567.jpg",
      video:
        "https://cdn.dribbble.com/userupload/15548212/file/original-cb32eaa4d4ee5bfdeef33dd32790898e.mp4",
    },
    {
      id: 3,
      title: "Flutter Real-time Workspace",
      description:
        "A collaborative workspace app built in Flutter, enabling teams to work together in real-time with instant notifications and seamless communication tools.",
      image:
        "https://cdn.dribbble.com/userupload/5800651/file/original-9b33b3725e6991c2ef6c2e2a9632c340.png",
      video:
        "https://cdn.dribbble.com/userupload/16834573/file/original-088532f01707c89a2774eae15f4242bf.mp4",
    },
    {
      id: 4,
      title: "MERN Stack Remittance System",
      description:
        "A secure and scalable remittance system using the MERN stack, providing fast money transfers, user authentication, and real-time transaction tracking.",
      image:
        "https://cdn.dribbble.com/userupload/14449293/file/original-f555f9bcaf89e3376eb8a7a2182f0eec.jpg",
      video:
        "https://cdn.dribbble.com/userupload/16297357/file/original-34e5474801bc2d9f38638fb21a95e162.mp4",
    },
    {
      id: 5,
      title: "React Native Food Delivery",
      description:
        "A cross-platform food delivery solution built with React Native, featuring real-time order tracking, user-friendly interfaces, and efficient state management.",
      image:
        "https://cdn.dribbble.com/userupload/17456178/file/original-25b698d7e80ef1f3cabfe0bc5f276c43.png",
      video:
        "https://cdn.dribbble.com/users/890912/screenshots/17912156/media/1918d9f71c7a937ecea3c4495c9da89a.mp4",
    },
    {
      id: 6,
      title: "Flutter DishDash Food-Delivery",
      description:
        "A visually engaging food delivery app created with Flutter, offering real-time order tracking, seamless payments, and a delightful user experience.",
      image:
        "https://cdn.dribbble.com/userupload/24653918/file/original-6b0ee66179ff35e2fffd61764680a0f8.png",
      video:
        "https://cdn.dribbble.com/userupload/29507118/file/original-c828cb44b61098e49e4b95720badd41e.mp4",
    },
    {
      id: 7,
      title: "Fullstack Expo Access-Banking ",
      description:
        "A comprehensive banking and crypto finance application built with Expo, supporting secure transactions, real-time account updates, and cross-platform accessibility.",
      image:
        "https://cdn.dribbble.com/userupload/16384793/file/original-9125b6b4c5f84d683a5235953f163b3c.png",
      video:
        "https://cdn.dribbble.com/userupload/14669398/file/original-e607c80b4b370bf6e447d12ebe9327e7.mp4",
    },
    {
      id: 8,
      title: "MernStack Location-Tracking System",
      description:
        "A real-time location tracking system developed with the MERN stack, enabling users to monitor and manage locations with live updates and interactive maps.",
      image:
        "https://cdn.dribbble.com/userupload/29422034/file/original-aa566dd824e17a6ef3c96cc4e97dcd1a.png",
      video:
        "https://cdn.dribbble.com/userupload/14657157/file/original-8968a1fc3d4b9bd9758503c21c5d3d0d.mp4",
    },
    {
      id: 9,
      title: "Flutter Video-Conferencing App ",
      description:
        "A high-performance video conferencing app built in Flutter, supporting real-time video calls, chat, and collaboration tools for remote teams.",
      image:
        "https://cdn.dribbble.com/userupload/38940371/file/original-9a0fbaf8bfe14006c31ad05685d5165d.png",
      video:
        "https://cdn.dribbble.com/userupload/3635143/file/original-514f4ca97f52a9eca674704c124df0f8.mp4",
    },
    {
      id: 10,
      title: "React MobileApp Store ",
      description:
        "A sleek mobile app store interface developed with React, allowing users to browse, search, and install apps with a smooth and responsive experience.",
      image:
        "https://cdn.dribbble.com/userupload/34530889/file/original-b82454daf1e001d5e2c188a5c3ab3114.png",
      video:
        "",
    },
    {
      id: 11,
      title: "Flutter Pickload-Delivery App",
      description:
        "A dynamic logistics and delivery app built with Flutter, streamlining package pickups and drop-offs with real-time tracking and intuitive user flows.",
      image:
        "https://cdn.dribbble.com/userupload/41527198/file/original-fe9e36692df84cb956eba99320cdbbe8.png",
      video:
        "",
    },
    {
      id: 12,
      title: "Flutter OurRide Transport App",
      description:
        "A feature-rich transport app built in Flutter, connecting riders and drivers for seamless, real-time ride booking and management.",
      image:
        "https://cdn.dribbble.com/userupload/30496035/file/original-2f14ce0509544732aa414756d990ce75.jpg",
      video:
        "https://cdn.dribbble.com/userupload/5017149/file/original-5d6ff3387214722c38e9a1eb279d5cf4.mp4",
    },
    {
      id: 13,
      title: "Fullstack Credpal-Finance DashBoard ",
      description:
        "A powerful finance dashboard built with a fullstack approach, providing real-time analytics, transaction management, and insightful financial visualizations.",
      image:
        "https://cdn.dribbble.com/userupload/42793683/file/original-4d440b647015ae8baa140906749b26d9.png",
      video:
        "https://cdn.dribbble.com/userupload/38726235/file/original-bc3090cd0cb238c3a7c2edf70f3b5186.mp4",
    },
    {
      id: 14,
      title: "Python scripts, Virus and Sniffers",
      description:
        "A collection of advanced Python scripts, including custom virus detection and network packet sniffers, demonstrating deep skills in cybersecurity and automation.",
      image:
        "https://cdn.dribbble.com/users/458522/screenshots/17526524/media/744f6793a6f76cacffae4720a0fb64be.png",
      video:
        "https://cdn.dribbble.com/userupload/10293344/file/original-94eaa164ccebdbd25aed56710dd14ebd.mp4",
    },
    {
      id: 15,
      title: "Flutter Financial-Management App",
      description:
        "A comprehensive financial management app built with Flutter, empowering users to track expenses, manage budgets, and visualize financial health in real time.",
      image:
        "https://cdn.dribbble.com/userupload/15948361/file/original-88201892067553cefc9912564beef1ce.jpg",
      video:
        "https://cdn.dribbble.com/userupload/2899475/file/large-417e7a59ee4d63f603d63d16db55fcdc.mp4",
    },
    {
      id: 16,
      title: "Expo Expense-Tracker",
      description:
        "A cross-platform expense tracker built with Expo, enabling users to monitor spending, categorize expenses, and gain actionable financial insights on the go.",
      image:
        "https://cdn.dribbble.com/userupload/2775582/file/original-51c823be4cea301cb791f7437309a010.jpg",
      video:
        "https://cdn.dribbble.com/userupload/3542252/file/original-6f400868f309dc6e7b961300616fe631.mp4",
    },
    {
      id: 17,
      title: "Flutter SocialCloud Media-App",
      description:
        "A modern social media app developed in Flutter, featuring real-time feeds, cloud integration, and interactive social networking capabilities.",
      image:
        "https://cdn.dribbble.com/userupload/14464125/file/original-2e6f78b0c237496ee79ed23c24e48a8b.png",
      video:
        "https://cdn.dribbble.com/userupload/38088294/file/original-22bf666923919a2e9e6e2c7dccbf56bb.mp4",
    },
  ];
  

  export default projects;