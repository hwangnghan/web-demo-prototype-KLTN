/* =============================================================
   NỘI DUNG TRANG "CÓ BÉ SEN DẪN ĐƯỜNG"
   Sửa chữ trực tiếp trong dấu ngoặc kép "...". Lưu file rồi tải lại trang.
   - Dòng có ghi  // KIỂM TRA  là thông tin về Đồng Tháp cần bạn đối chiếu
     với nguồn chính thống, rồi điền nguồn vào ô  nguon: "".
   - Tên hình (vd "sen-hi") lấy từ danh sách trong assets.js.
   - anh: null  nghĩa là đang dùng hình minh họa tạm.
   - chuThichAnh: chữ nhỏ hiện ở góc ảnh (để "" nếu không cần).
   - Thẻ chưa có ảnh: để anh: null và ghi canAnh: "mô tả ảnh cần", trang sẽ hiện
     khung tạm "[ẢNH: ...]". Ảnh cũng có thể là đường dẫn file, vd "images/anh-xoai.jpg".
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
      anhPostcard: "anh-dong-sen",
      moTaAnh: "",
      doanChuyen: [
        // KIỂM TRA: mốc hợp nhất tỉnh và phạm vi địa lý
        "Bạn có biết Đồng Tháp bây giờ rộng hơn trước rất nhiều không? Từ giữa năm 2025, Đồng Tháp và Tiền Giang hợp nhất thành một tỉnh, vẫn mang tên Đồng Tháp. Từ những cánh đồng sen vùng Đồng Tháp Mười, xuôi theo sông Tiền, mình có thể đi đến tận biển Gò Công.",
        "Mỗi khúc sông lại lưu giữ một câu chuyện: chuyện ông bà đi mở đất, chuyện những trận đánh trên sông, chuyện những ngôi nhà xưa vẫn còn đứng đó. Sen đã chọn ra sáu câu chuyện, bạn lật thử từng thẻ nhé."
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
          nguon: "" },
        { tieuDe: "Miễu Ông Bà Chủ Chợ",   // KIỂM TRA
          anh: "images/anh-mieu-ong-ba.webp",
          noiDung: "Bạn có biết tên Cao Lãnh từ đâu mà có không? Ngày xưa, ông Đỗ Công Tường, tục danh Lãnh, cùng vợ lập chợ ở làng Mỹ Trà, người dân gọi là chợ ông Câu Lãnh. Năm 1820, dịch bệnh hoành hành, hai ông bà tìm thuốc cứu người rồi lần lượt qua đời. Người dân thương nhớ, lập miếu thờ đến tận hôm nay. Nghe chuyện này, lòng Sen ấm áp lạ thường.",
          nguon: "Báo Pháp luật: baophapluat.vn/nguon-goc-ten-goi-cao-lanh-va-chuyen-vo-chong-chu-cho-duoc-dan-ton-tho-post425248.html; Tuổi Trẻ: tuoitre.vn/le-gio-ong-ba-do-cong-tuong-thu-hut-hang-ngan-nguoi-dan-ve-dong-thap-2024071310522243.htm" },
        { tieuDe: "Khu di tích Gò Tháp",   // KIỂM TRA
          anh: "images/anh-go-thap.webp",
          noiDung: "Giữa đồng nước Tháp Mười có một gò đất nhỏ, nhưng lòng đất nơi đây lại cất giữ dấu tích của văn hóa Óc Eo, phát triển từ khoảng thế kỷ I đến thế kỷ VII. Các nhà khảo cổ đã tìm thấy nền móng đền tháp cổ cùng nhiều hiện vật quý. Năm 2012, Gò Tháp được xếp hạng di tích quốc gia đặc biệt. Đứng giữa gò, Sen cứ ngỡ mình đang trò chuyện với người xưa.",
          nguon: "Nhân Dân: nhandan.vn/post-838991.html; Vietnam Airlines: vietnamairlines.com/at/vi/plan-book/travel/travel-guide/khu-di-tich-go-thap" },
        { tieuDe: "Chùa Vĩnh Tràng",   // KIỂM TRA
          anh: "images/anh-vinh-trang.webp",
          noiDung: "Chùa Vĩnh Tràng ở Mỹ Tho được dựng từ đầu thế kỷ XIX. Điều làm Sen thích thú là kiến trúc giao thoa Á – Âu: bên trong giữ nét chùa Việt truyền thống, còn mặt tiền lại có vòm cửa và hàng cột kiểu phương Tây. Cổng tam quan được khảm những mảnh sành sứ nhiều màu, lấp lánh dưới nắng. Bước vào sân chùa, Sen tự nhiên đi chậm lại, lòng nhẹ tênh.",
          nguon: "VietnamPlus: vietnamplus.vn/kham-pha-chua-vinh-trang-tuyet-tac-kien-truc-giao-thoa-a-au-o-nam-bo-post1141699.vnp" }
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
        "Đồng Tháp nay có thêm những miệt vườn trù phú ven sông Tiền, nên mâm cơm càng thêm phong phú. Sen đã chọn sáu món mình thích nhất, mời bạn nếm thử bằng mắt trước nhé."
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
          nguon: "" },
        { tieuDe: "Hủ tiếu Sa Đéc",   // KIỂM TRA
          anh: "images/anh-hu-tieu-sa-dec.webp",
          noiDung: "Ăn hủ tiếu Mỹ Tho rồi, bạn thử thêm hủ tiếu Sa Đéc nhé! Sợi hủ tiếu ở đây to hơn, màu trắng sữa, dai mềm và thơm vị gạo. Nước dùng ninh từ xương heo, trong và ngọt thanh. Còn hủ tiếu khô thì có nước xốt vàng sệt, trộn đều rồi ăn kèm chén súp nóng. Mỗi lần ăn, Sen đều húp đến giọt cuối cùng mới chịu đứng dậy.",
          nguon: "Tuổi Trẻ: tuoitre.vn/am-thuc/hu-tieu-sa-dec-972099.htm" },
        { tieuDe: "Bánh phồng tôm Sa Giang",   // KIỂM TRA
          anh: "images/anh-phong-tom.webp",
          noiDung: "Tiếng bánh phồng tôm nở lách tách trong chảo là âm thanh Sen mê nhất! Bánh phồng tôm Sa Giang ra đời năm 1960 ở Sa Đéc và từng đoạt Huy chương Bạc tại hội chợ Osaka, Nhật Bản năm 1970. Bây giờ, những miếng bánh giòn tan từ quê Sen đã có mặt ở hơn 40 quốc gia và vùng lãnh thổ. Nghĩ đến bạn bè khắp nơi cùng thưởng thức, Sen thấy tự hào lắm.",
          nguon: "Tạp chí Công Thương: tapchicongthuong.vn/sa-giang--65-nam-kien-tao-gia-tri-thuc-pham-viet-trong-tien-trinh-hoi-nhap-405587.htm" },
        { tieuDe: "Xoài Cao Lãnh",   // KIỂM TRA
          anh: "images/anh-xoai-cao-lanh.webp",
          noiDung: "Mùa xoài về, vườn ở Cao Lãnh treo đầy những trái xoài được bao giấy cẩn thận, nhờ vậy vỏ xoài sáng bóng và đẹp mắt. Nổi tiếng nhất là giống xoài cát Chu. Năm 2019, xoài Cao Lãnh được cấp chỉ dẫn địa lý, giống như một tấm giấy khai sinh cho trái ngon quê nhà. Cắn một miếng xoài chín, Sen thấy cả mùa hè ngọt lịm tan trong miệng.",
          nguon: "VnBusiness: vnbusiness.vn/xoai-cao-lanh-duoc-bao-ho-chi-dan-dia-ly.html (Quyết định 5849/QĐ-SHTT ngày 26/11/2019)" }
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
        "Đi một vòng, bạn sẽ thấy vẻ đẹp không chỉ nằm ở cảnh vật mà còn ở tình người. Sen đã để dành sáu khung cảnh đẹp nhất cho bạn đây."
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
          nguon: "" },
        { tieuDe: "Cù lao Thới Sơn",   // KIỂM TRA
          anh: "images/anh-thoi-son.webp",
          noiDung: "Giữa sông Tiền có bốn cồn mang tên Long, Lân, Quy, Phụng, và Thới Sơn là cồn lớn nhất. Ở đây, bạn ngồi xuồng ba lá len qua những con rạch nhỏ, nghe mái chèo khua nhẹ trên mặt nước. Ghé vào vườn, bạn được thưởng trái cây và nghe đờn ca tài tử do chính người dân trên cồn biểu diễn. Sen thích nhất lúc tiếng đàn vang lên, mọi thứ như chậm lại.",
          nguon: "VnExpress: vnexpress.net/cam-nang-du-lich-con-thoi-son-5103568.html" },
        { tieuDe: "Chợ nổi Cái Bè",   // KIỂM TRA
          anh: "images/anh-cho-noi-cai-be.webp",
          noiDung: "Trời còn tờ mờ sáng, chợ nổi Cái Bè trên sông Tiền đã rộn ràng ghe xuồng. Muốn biết ghe nào bán gì, bạn chỉ cần nhìn lên cây bẹo, cây sào cao treo sẵn trái cây, rau củ. Chợ đã có từ thế kỷ XVIII và họp đông nhất vào sáng sớm. Sen khuyên bạn dậy sớm một chút, ngồi trên xuồng, nhìn nắng lên dần trên mặt sông. Bình yên lắm.",
          nguon: "VnExpress: vnexpress.net/5-cho-noi-doc-dao-mien-tay-2858525.html; RFA (chợ đang thưa dần): rfa.org/vietnamese/in_depth/memory-of-floating-market-01032019102910.html" },
        { tieuDe: "Biển Tân Thành",   // KIỂM TRA
          anh: "images/anh-bien-tan-thanh.webp",
          noiDung: "Biển Tân Thành ở Gò Công không có bãi cát trắng mà là bãi bùn phù sa mềm mịn, nên không hợp để tắm biển. Bù lại, bạn có thể cầm cây cào, đeo giỏ, cùng người dân đi cào nghêu. Chiều xuống, cả mặt biển ửng màu cam hồng của hoàng hôn. Sen thích ngồi lặng yên, nghe gió biển mằn mặn thổi qua. Những lúc ấy, mọi lo toan như trôi đi thật xa.",
          nguon: "Vietnam Airlines: vietnamairlines.com/la/vi/plan-book/travel/travel-guide/khu-du-lich-bien-tan-thanh; MIA.vn: mia.vn/cam-nang-du-lich/bien-tan-thanh-tien-giang-voi-net-thu-hut-an-tuong-5137" }
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
    daLat: "Đã lật",        // bộ đếm hiện: "Đã lật 2/6" (số thẻ tự đếm theo từng nhánh)
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
    loiTai: "Bạn nhấn giữ (hoặc nhấp chuột phải) vào postcard rồi chọn lưu ảnh nhé."
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
