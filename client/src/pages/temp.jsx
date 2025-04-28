import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Tạo một component tái sử dụng cho từng phần bài báo
function Section({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      style={{ marginBottom: "80px" }} // cách mỗi section ra cho dễ scroll
    >
      {children}
    </motion.div>
  );
}

// Component chính
export default function ArticlePage() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <Section>
        <h1>Vẻ đẹp của môn cầu lông</h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Cầu lông là một trong những môn thể thao phổ biến nhất thế giới, thu hút hàng triệu người chơi ở mọi lứa tuổi.
        </p>
      </Section>

      <Section>
        <h2>1. Lịch sử ra đời</h2>
        <p>
          Môn cầu lông hiện đại bắt nguồn từ Ấn Độ vào thế kỷ 19, với tên gọi ban đầu là "Poona". Sau đó, nó được người Anh đưa về nước và phát triển thành môn thể thao quốc tế.
        </p>
      </Section>

      <Section>
        <h2>2. Luật chơi cơ bản</h2>
        <p>
          Người chơi sử dụng vợt để đánh trái cầu (shuttlecock) qua lưới. Mục tiêu là khiến đối thủ không thể trả cầu hợp lệ. Trận đấu thường chơi theo thể thức 2 hoặc 3 set, ai thắng 2 set trước sẽ chiến thắng.
        </p>
      </Section>

      <Section>
        <h2>3. Lợi ích đối với sức khỏe</h2>
        <p>
          Cầu lông giúp cải thiện phản xạ, tăng cường sức khỏe tim mạch và rèn luyện sự nhanh nhẹn. Ngoài ra, đây cũng là cách tuyệt vời để giảm stress sau những giờ làm việc căng thẳng.
        </p>
      </Section>

      <Section>
        <h2>Kết luận</h2>
        <p>
          Với sự kết hợp giữa thể lực, chiến thuật và tinh thần đồng đội, cầu lông không chỉ là một môn thể thao giải trí mà còn là phong cách sống cho nhiều người trên khắp thế giới.
        </p>
      </Section>
    </div>
  );
}
