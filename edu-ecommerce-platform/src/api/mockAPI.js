// Dữ liệu giả cho các khóa học
const mockProducts = [
  {
    id: 1,
    name: "Khóa học ReactJS từ A đến Z",
    price: 799000,
    shortDescription:
      "Học ReactJS và các khái niệm cốt lõi một cách toàn diện.",
    longDescription:
      "Đây là khóa học đầy đủ nhất về ReactJS, bao gồm Hooks, Redux, React Router và xây dựng dự án thực tế. Phù hợp cho người mới bắt đầu và cả những người đã có kinh nghiệm.",
    imageUrl: "/img/reactjs.jpg",
    reviews: [
      { user: "Học viên A", comment: "Khóa học rất hay và chi tiết!" },
      { user: "Học viên B", comment: "Giảng viên nhiệt tình, dễ hiểu." },
    ],
  },
  {
    id: 2,
    name: "Lập trình VueJS cho người mới bắt đầu",
    price: 450000,
    shortDescription: "Xây dựng ứng dụng web hiện đại với VueJS.",
    longDescription:
      "Khóa học này sẽ dẫn dắt bạn qua các khái niệm cơ bản của VueJS như Vue Instance, Components, Vue Router và Vuex. Cuối khóa bạn sẽ tự tay làm một dự án nhỏ.",
    imageUrl: "/img/vueJS.jpg",
    reviews: [{ user: "Học viên C", comment: "Rất đáng tiền." }],
  },
  {
    id: 3,
    name: "Master JavaScript & ES6+",
    price: 999000,
    shortDescription:
      "Nắm vững JavaScript hiện đại để trở thành Full-stack dev.",
    longDescription:
      "Từ closures, prototypes cho đến async/await và modules, khóa học này bao gồm mọi thứ bạn cần biết về JavaScript để tự tin phỏng vấn và làm việc.",
    imageUrl: "/img/masterJS.jpg",
    reviews: [],
  },
  {
    id: 4,
    name: "Thiết kế UI/UX với Figma",
    price: 1200000,
    shortDescription: "Học cách thiết kế giao diện chuyên nghiệp.",
    longDescription:
      "Khóa học tập trung vào các nguyên tắc thiết kế, wireframing, prototyping và cách sử dụng thành thạo công cụ Figma để tạo ra những sản phẩm đẹp và thân thiện với người dùng.",
    imageUrl: "/img/figma.jpg",
    reviews: [
      {
        user: "Học viên D",
        comment: "Giúp mình cải thiện tư duy thiết kế rất nhiều.",
      },
    ],
  },
  {
    id: 5,
    name: "Khóa học Node.js Backend",
    price: 850000,
    shortDescription: "Học backend với Node.js và Express",
    longDescription: "Khóa học chi tiết về xây dựng API với Node.js...",
    imageUrl: "/img/nodejs.jpg",
    reviews: [],
  },
  {
    id: 6,
    name: "Khóa học Python từ cơ bản đến nâng cao",
    price: 699000,
    shortDescription: "Học Python từ cơ bản đến lập trình web và AI",
    longDescription:
      "Khóa học Python toàn diện từ cú pháp cơ bản, lập trình hướng đối tượng, xử lý dữ liệu với pandas, numpy, đến xây dựng web với Django/Flask và machine learning cơ bản. Phù hợp cho người mới bắt đầu.",
    imageUrl: "/img/python.jpg",
    reviews: [
      { user: "Minh Anh", comment: "Khóa học rất dễ hiểu, phù hợp người mới" },
      { user: "Văn Đức", comment: "Giảng viên nhiệt tình, bài tập thực tế" },
    ],
  },
  {
    id: 7,
    name: "Flutter Mobile Development",
    price: 1299000,
    shortDescription: "Xây dựng app mobile đa nền tảng với Flutter",
    longDescription:
      "Khóa học Flutter chi tiết từ cài đặt môi trường, Dart language, widgets, state management với Provider/Bloc, tích hợp API, database local, đến publish app lên Store. Xây dựng 3 project thực tế hoàn chỉnh.",
    imageUrl: "/img/flutter.jpg",
    reviews: [
      {
        user: "Thảo Nguyen",
        comment: "Học xong làm được app thật, rất hài lòng",
      },
      { user: "Hoàng Nam", comment: "Nội dung cập nhật, code sạch đẹp" },
    ],
  },
  {
    id: 8,
    name: "Docker & Kubernetes DevOps",
    price: 899000,
    shortDescription: "Triển khai ứng dụng với Docker và Kubernetes",
    longDescription:
      "Khóa học DevOps tập trung vào containerization với Docker, orchestration với Kubernetes, CI/CD pipeline, monitoring và scaling. Học cách deploy ứng dụng production-ready trên cloud platforms như AWS, GCP.",
    imageUrl: "/img/docker.jpg",
    reviews: [
      {
        user: "Quang Minh",
        comment: "Kiến thức DevOps rất thực tế cho công việc",
      },
      {
        user: "Lan Hương",
        comment: "Từ junior lên được senior nhờ khóa học này",
      },
    ],
  },
  {
    id: 9,
    name: "Data Science & Machine Learning",
    price: 1599000,
    shortDescription: "Phân tích dữ liệu và xây dựng mô hình AI",
    longDescription:
      "Khóa học Data Science toàn diện với Python, pandas, numpy, matplotlib, scikit-learn và TensorFlow. Học cách thu thập, xử lý, phân tích dữ liệu và xây dựng các mô hình machine learning thực tế. Thực hành với 4 dự án: dự đoán giá nhà, phân loại email spam, nhận dạng hình ảnh và chatbot.",
    imageUrl: "/img/data.jpg",
    reviews: [
      {
        user: "Minh Khôi",
        comment: "Từ không biết gì đến làm được mô hình AI",
      },
      {
        user: "Phương Anh",
        comment: "Dataset thực tế, bài tập hay và hữu ích",
      },
      { user: "Tuấn Vũ", comment: "Giảng viên giải thích rất dễ hiểu" },
    ],
  },
];

// Giả lập API lấy tất cả sản phẩm
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500); // Giả lập độ trễ 0.5s
  });
};

// Giả lập API lấy gợi ý sản phẩm
export const fetchSuggestions = (userId) => {
  console.log(`Đang lấy gợi ý cho người dùng: ${userId}`);
  // Giả lập 80% thành công
  const isSuccess = Math.random() > 0.2;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
        resolve(shuffled.slice(0, 2));
      } else {
        reject(new Error("Không thể lấy gợi ý lúc này, vui lòng thử lại sau."));
      }
    }, 1500); // Giả lập độ trễ 1.5s
  });
};
