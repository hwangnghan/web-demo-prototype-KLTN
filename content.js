/* =============================================================
   NỘI DUNG TRANG "CÓ BÉ SEN DẪN ĐƯỜNG"
   Sửa chữ trực tiếp trong dấu ngoặc kép "...". Lưu file rồi tải lại trang.
   - Dòng có ghi  // KIỂM TRA  là thông tin về Đồng Tháp cần bạn đối chiếu
     với nguồn chính thống, rồi điền nguồn vào ô  nguon: "".
   - Tên hình (vd "sen-hi") lấy từ danh sách trong assets.js.
   - anh: null  nghĩa là đang dùng hình minh họa tạm.
   - chuThichAnh: chữ nhỏ hiện ở góc ảnh (để "" nếu không cần).
   ============================================================= */

window.CONTENT = {

  /* ---------- Màu chủ đạo (lấy từ Bé Sen và logo) ---------- */
  mau: {
    sen:     "#E8548F",   // hồng sen đậm
    senNhat: "#FCE1EC",   // hồng cánh sen nhạt
    la:      "#6DAE35",   // xanh lá sen
    laDam:   "#1E4A2B",   // xanh lá đậm, dùng cho chữ
    lua:     "#F5A31F",   // vàng cam lúa chín
    nen:     "#FFFBFC"    // nền trắng ánh hồng
  },

  /* ---------- Phần mở đầu ---------- */
  moDau: {
    tieuDe: "Có Bé Sen\ndẫn đường",
    nhanLogo: "Đồng Tháp",
    moTa: "Theo tâm trạng của bạn, cùng Sen khám phá Đồng Tháp.",
    nut: "Đi cùng Sen",
    hinh: "sen-welcome",
    loiChao: [
      "Chào bạn! Mình là Bé Sen đây.",
      "Hôm nay Sen sẽ làm hướng dẫn viên cho bạn.",
      "Chỉ mất khoảng hai phút thôi, bạn đi cùng Sen nhé?"
    ]
  },

  /* ---------- Chọn tâm trạng ---------- */
  chonTamTrang: {
    tieuDe: "Hôm nay bạn thấy sao?",
    moTa: "Chọn một tâm trạng, Sen sẽ dẫn bạn đến góc Đồng Tháp hợp với bạn nhất.",
    nutChon: "Đi theo hướng này"
  },

  /* ---------- Ba nhánh trải nghiệm ---------- */
  nhanh: [
    {
      id: "chuyen",
      tamTrang: "Tò mò, muốn nghe chuyện",
      nhanNgan: "Nghe chuyện",
      ten: "Câu chuyện Đồng Tháp",
      mauNhanh: "#E8548F",
      mauNhat: "#FCE1EC",
      canh: "binhminh",
      hinhChon: "sen-liu-liu",
      hinhPhanHoi: "sen-hi",
      goiY: "Mỗi vùng đất đều có những câu chuyện riêng. Sen sẽ kể bạn nghe vài chuyện xưa mà đến nay vẫn còn ấm áp.",
      loiSen: [
        "Bạn thích nghe chuyện à? Vậy là hợp ý Sen rồi!",
        "Mình cùng bắt đầu từ dòng sông Tiền nhé."
      ],
      tieuDeChuyen: "Từ đồng sen đến biển Gò Công",
      anh: "anh-song-tien",
      chuThichAnh: "Sông Tiền",
      anhPostcard: "anh-song-tien",
      moTaAnh: "",
      doanChuyen: [
        // KIỂM TRA: mốc hợp nhất tỉnh và phạm vi địa lý
        "Bạn có biết Đồng Tháp bây giờ rộng hơn trước rất nhiều không? Từ giữa năm 2025, Đồng Tháp và Tiền Giang hợp nhất thành một tỉnh, vẫn mang tên Đồng Tháp. Từ những cánh đồng sen vùng Đồng Tháp Mười, xuôi theo sông Tiền, mình có thể đi đến tận biển Gò Công.",
        "Mỗi khúc sông lại lưu giữ một câu chuyện: chuyện ông bà đi mở đất, chuyện những trận đánh trên sông, chuyện những ngôi nhà xưa vẫn còn đứng đó. Sen đã chọn ra ba câu chuyện, bạn lật thử từng thẻ nhé."
      ],
      batMi: [
        { tieuDe: "Khu di tích Nguyễn Sinh Sắc",   // KIỂM TRA
          anh: "anh-nguyen-sinh-sac",
          noiDung: "Ở Cao Lãnh có một khu vườn xanh mát, là nơi an nghỉ của cụ Phó bảng Nguyễn Sinh Sắc, thân sinh của Chủ tịch Hồ Chí Minh. Mỗi lần ghé, Sen đều bước thật khẽ, nghe tiếng lá xào xạc và ngắm những hồ sen trong khuôn viên. Nơi này yên tĩnh lắm, rất hợp để dừng chân và tìm hiểu thêm về cuộc đời của cụ.",
          nguon: "" },
        { tieuDe: "Rạch Gầm – Xoài Mút",    // KIỂM TRA
          anh: "anh-rach-gam",
          noiDung: "Bây giờ khúc sông Tiền ở Rạch Gầm – Xoài Mút hiền hòa lắm, chỉ có ghe xuồng qua lại. Nhưng năm 1785, chính nơi đây đã diễn ra trận thủy chiến lừng lẫy, khi Nguyễn Huệ chỉ huy nghĩa quân Tây Sơn đánh tan quân Xiêm. Mỗi lần đứng bên bờ sông, Sen lại tưởng tượng tiếng trống trận năm xưa vang lên giữa mặt nước.",
          nguon: "" },
        { tieuDe: "Nhà cổ Huỳnh Thủy Lê",   // KIỂM TRA
          anh: "anh-huynh-thuy-le",
          noiDung: "Ở Sa Đéc có một ngôi nhà cổ mang mái ngói kiểu Á Đông nhưng mặt tiền lại đậm dáng vẻ phương Tây. Ngôi nhà gắn với mối tình được nhà văn Pháp Marguerite Duras kể lại trong tiểu thuyết Người tình. Sen thích đứng trước cổng, ngắm những hoa văn cũ kỹ và đoán xem ngôi nhà đã chứng kiến bao nhiêu câu chuyện.",
          nguon: "" }
      ],
      loiNhan: [
        "Có vài câu chuyện Sen để dành, đợi bạn về Đồng Tháp rồi mình ngồi kể nhau nghe.",
        "Gửi bạn chút thương từ miền đất sen hồng. Mong một ngày, nơi đây cũng thành một miền nhớ của bạn.",
        "Nghe một câu chuyện thôi, biết đâu bạn lại thương cả một vùng đất. Hôm nào về, Sen kể tiếp nha."
      ]
    },
    {
      id: "dacsan",
      tamTrang: "Hơi đói, muốn ăn ngon",
      nhanNgan: "Ăn ngon",
      ten: "Đặc sản Đồng Tháp",
      mauNhanh: "#E58A10",
      mauNhat: "#FEEFD6",
      canh: "chieuvang",
      hinhChon: "sen-trieu-like",
      hinhPhanHoi: "sen-liu-liu",
      goiY: "Món ngon miền sông nước, ăn một lần là nhớ mãi.",
      loiSen: [
        "Nhắc đến ăn là Sen cũng thấy đói theo rồi!",
        "Nào, Sen dẫn bạn đi thưởng thức một vòng nhé."
      ],
      tieuDeChuyen: "Ngon từ đồng, ngọt từ sông",
      anh: "anh-mam-com",
      chuThichAnh: "Mâm cơm món sen",
      anhPostcard: "anh-mam-com",
      moTaAnh: "",
      doanChuyen: [
        "Ở miền sông nước, món ngon thường bắt đầu từ những thứ rất gần gũi: con cá dưới đồng, trái cây trong vườn, bông sen ngoài đầm. Người Đồng Tháp nấu nướng không cầu kỳ, nhưng ăn vào là cảm nhận được vị ngọt thanh, đậm đà rất riêng của miền Tây.",
        "Đồng Tháp nay có thêm những miệt vườn trù phú ven sông Tiền, nên mâm cơm càng thêm phong phú. Sen đã chọn ba món mình thích nhất, mời bạn nếm thử bằng mắt trước nhé."
      ],
      batMi: [
        { tieuDe: "Hủ tiếu Mỹ Tho",                    // KIỂM TRA
          anh: "anh-hu-tieu",
          noiDung: "Buổi sáng ở Mỹ Tho, Sen thích nhất là được ngồi trước một tô hủ tiếu nóng hổi. Sợi hủ tiếu dai mềm, nước dùng trong và ngọt thanh, thêm vài con tôm, vài lát thịt, ăn kèm rau và giá sống. Ăn xong một tô là Sen đủ năng lượng dẫn bạn đi chơi cả ngày rồi!",
          nguon: "" },
        { tieuDe: "Nem Lai Vung",                      // KIỂM TRA
          anh: "anh-nem-lai-vung",
          noiDung: "Chỉ cần nhìn những gói nem đỏ hồng xếp chồng lên nhau là Sen đã thấy vui mắt rồi. Nem Lai Vung có vị chua nhẹ, cay cay, thơm mùi tỏi và tiêu. Du khách ghé Lai Vung thường mua về làm quà, để người ở nhà cũng được nếm chút hương vị Đồng Tháp.",
          nguon: "" },
        { tieuDe: "Món ngon từ sen",                   // KIỂM TRA
          anh: "anh-mon-sen",
          noiDung: "Ở xứ sen, từ hạt, ngó đến lá sen đều có thể vào bếp. Gỏi ngó sen giòn mát, chè hạt sen bùi bùi, cơm gói lá sen thơm lừng. Nghe kể đến đây, Sen vừa tự hào vừa hơi ngại, vì họ hàng nhà Sen được mọi người khen ngon nhiều quá!",
          nguon: "" }
      ],
      loiNhan: [
        "Ước gì bạn đang ở đây, Sen sẽ rủ bạn đi ăn một bữa thật ngon. Đồng Tháp còn nhiều món Sen muốn bạn thử lắm.",
        "Có những món ăn, rời đi rồi vẫn nhớ. Mong bạn giữ lại một chút hương vị Đồng Tháp trong lòng.",
        "Hôm nào về Đồng Tháp, mình ngồi ăn với nhau nha. Ăn thong thả, kể vài chuyện nhỏ, vậy thôi cũng vui."
      ]
    },
    {
      id: "netdep",
      tamTrang: "Cùng Sen tìm chút bình yên",
      nhanNgan: "Tìm bình yên",
      ten: "Nét đẹp Đồng Tháp",
      mauNhanh: "#4E9A2A",
      mauNhat: "#E6F3D8",
      canh: "sangxanh",
      hinhChon: "sen-yeu",
      hinhPhanHoi: "sen-vay-tay",
      goiY: "Đồng sen, làng hoa và những cánh chim trên đồng nước. Cứ đi chậm thôi, đẹp lắm.",
      loiSen: [
        "Vậy mình cùng đi thật chậm nhé.",
        "Đồng Tháp đẹp nhất là khi bạn không vội vàng."
      ],
      tieuDeChuyen: "Đẹp một cách hiền hòa",
      anh: "anh-le-hoi-hoa",
      chuThichAnh: "Làng hoa Sa Đéc",
      anhPostcard: "anh-dong-sen",
      moTaAnh: "",
      doanChuyen: [
        "Đồng Tháp đẹp một cách hiền hòa. Sáng sớm có sương mỏng trên đồng sen, buổi trưa nắng vàng trải trên ruộng lúa, chiều xuống dòng sông lấp lánh. Người dân nơi đây sống chậm, hay cười và luôn niềm nở với khách phương xa.",
        "Đi một vòng, bạn sẽ thấy vẻ đẹp không chỉ nằm ở cảnh vật mà còn ở tình người. Sen đã để dành ba khung cảnh đẹp nhất cho bạn đây."
      ],
      batMi: [
        { tieuDe: "Đồng sen Tháp Mười",      // KIỂM TRA
          anh: "anh-dong-sen",
          noiDung: "Vào mùa sen nở, cả cánh đồng nhuộm một màu hồng phấn. Ngồi xuồng len giữa đầm sen, bạn sẽ thấy hương thơm dịu nhẹ theo gió đưa tới. Đây chính là nhà của Sen đó! Sen mong bạn ghé vào một buổi sáng sớm, khi sương còn đọng trên lá và mặt nước còn phẳng lặng.",
          nguon: "" },
        { tieuDe: "Làng hoa Sa Đéc",         // KIỂM TRA
          anh: "anh-lang-hoa",
          noiDung: "Làng hoa nằm bên dòng sông Tiền, lúc nào cũng rực rỡ sắc màu. Rộn ràng nhất là những ngày giáp Tết, khi từng chậu hoa được chăm chút rồi chở đi muôn nơi. Sen thích đi dạo giữa những luống hoa, hít một hơi thật sâu rồi chọn một góc thật xinh để chụp ảnh.",
          nguon: "" },
        { tieuDe: "Vườn quốc gia Tràm Chim", // KIỂM TRA
          anh: "anh-tram-chim",
          noiDung: "Ở Tràm Chim, đồng nước mênh mông và rừng tràm xanh mát là nhà của rất nhiều loài chim. Nếu may mắn, bạn còn có thể gặp sếu đầu đỏ, loài chim quý hiếm mà ai cũng mong được thấy một lần. Sen nhắc nhỏ: đi nhẹ, nói khẽ để các bạn chim không giật mình nhé.",
          nguon: "" }
      ],
      loiNhan: [
        "Ước gì bạn ở đây, ngồi cạnh Sen một lúc, ngắm đồng sen và nghe gió thổi qua.",
        "Gửi bạn một buổi chiều Đồng Tháp thật êm. Mong khi nhìn tấm thiệp này, lòng bạn cũng thấy nhẹ nhàng.",
        "Hôm nào muốn đi đâu đó, cứ về Đồng Tháp chơi nha. Sen muốn cùng bạn ngắm nơi này, thật chậm."
      ]
    }
  ],

  /* ---------- Sen bật mí (thẻ lật) ---------- */
  batMi: {
    tieuDe: "Sen bật mí",
    moTa: "Chạm vào từng thẻ để lật nhé.",
    nhacLat: "Chạm để lật",
    nutTiep: "Làm postcard gửi bạn",
    nutXemThem: "Sen bật mí thêm"
  },

  /* ---------- Postcard ---------- */
  postcard: {
    tieuDe: "Gửi một tấm postcard",
    moTa: "Nhập tên của bạn hoặc người bạn muốn gửi, chọn lời nhắn, phần còn lại cứ để Sen lo.",
    nhanTen: "Tên hoặc biệt danh",
    goiYTen: "Ví dụ: Minh Thư",
    nhanLoiNhan: "Chọn lời nhắn",
    nhanDang: "Chọn dáng Bé Sen",
    dangSen: ["sen-yeu", "sen-trieu-like", "sen-hi"],
    gui: "Gửi",
    goiMacDinh: "bạn",
    chuKy: "Thương, Bé Sen",
    tem: ["Gửi từ", "Đồng Tháp"],
    chanTrai: "Có Bé Sen dẫn đường",
    chanPhai: "Đồng Tháp",
    nutTai: "Tải postcard",
    riengTu: "Tên chỉ dùng để vẽ postcard ngay trên máy này, không gửi đi đâu cả.",
    loiTai: "Chưa tải được. Bạn nhấn giữ (hoặc nhấp chuột phải) vào postcard để lưu ảnh nhé."
  },

  /* ---------- Khám phá tiếp ---------- */
  ketThuc: {
    hinh: "sen-oa-oa",
    tieuDe: "Ôi, chuyến đi kết thúc rồi sao?",
    moTa: "Vẫn còn hai góc Đồng Tháp nữa, bạn đi tiếp cùng Sen nhé!",
    nutTuDau: "Chọn lại từ đầu"
  },

  /* ---------- Bé Sen nhắc nhỏ ở góc màn hình ---------- */
  nhacNho: {
    hinh: "sen-hi",
    tamTrang: "Chạm vào một tâm trạng để chọn nhé.",
    cauChuyen: "Đọc xong, bạn bấm “Sen bật mí thêm” nhé.",
    batMi: "Chạm vào thẻ để lật nhé.",
    latHet: "Bạn đã lật hết rồi! Giờ mình cùng làm postcard nhé.",
    postcard: "Bạn nhập tên vào, Sen sẽ vẽ ngay.",
    taiXong: "Tải xong rồi! Khi gửi cho ai, nhớ kể là có Sen dẫn đường nhé."
  },

  /* ---------- Chân trang ---------- */
  chanTrang: {
    ghiChu: "Prototype minh họa hàm ý nghiên cứu về nhân cách hóa thương hiệu điểm đến qua mascot Bé Sen, thuộc khóa luận tốt nghiệp chuyên ngành Thiết kế truyền thông.",
    nguon: "Hình Bé Sen và logo thuộc thương hiệu điểm đến Đồng Tháp. Ảnh minh họa sưu tầm từ Internet, chỉ sử dụng cho mục đích học tập.",
    banNhap: "Bản nháp: nội dung đang được kiểm chứng."
  }
};
