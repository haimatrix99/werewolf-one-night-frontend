import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function Help() {
  return (
    <div className="z-20 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] bg-indigo-500 border border-white rounded-2xl overflow-y-scroll">
      <div className="flex justify-center items-center gap-2 h-fit my-1 border-b border-white px-2">
        <FaRegQuestionCircle className="text-white text-lg" />
        <h1 className="text-lg text-white md:text-2xl font-medium uppercase">
          Werewolf One Night
        </h1>
      </div>
      <div className="text-left mx-4 text-white text-lg font-medium py-2">
        <h2 className="text-2xl font-semibold text-orange-500">
          1. Giới thiệu về bộ bài Werewolf One Night
        </h2>
        <p>
          Bộ bài Ma sói One Night có số quân và chức năng khác biệt nhiều so với
          bộ bài Ma sói Characters. Một bộ bài đầy đủ bao gồm: <br />- 16 thẻ
          bài lá với 12 chức năng (nhân vật) khác nhau. Chức năng của từng loại
          quân bài sẽ được giới thiệu tại phần 2. <br />- 16 thẻ bài tròn cũng
          với 12 chức năng khác nhau.
        </p>
        <h2 className="text-2xl font-semibold text-orange-500">
          2. Các nhân vật trong Werewolf One Night
        </h2>
        <p>Các nhân vật được trong Werewolf One Night được chia làm 3 phe.</p>
        <h3 className="text-xl font-semibold text-black">1. Dân làng</h3>
        <div className="flex gap-2">
          <img
            src="/images/roles/Dân làng.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Dân làng (Villager)
            </span>
            : tương tự Ma sói Characters, dân làng trong Ma sói One Night cũng
            không có chức năng đặc biệt nào cả và chiếm số đông trong ngôi làng
            ( có 3/16 lá bài là Dân làng). Nhân vật này ngủ suốt đêm.
          </p>
        </div>
        <div className="flex gap-2">
          <img
            src="/images/roles/Tiên tri.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Tiên tri (Seer)
            </span>
            : ban đêm Tiên tri có thể nhìn lá bài của người khác hoặc là xem 2
            lá bài ở giữa, nhưng không được phép di chuyển chúng
          </p>
        </div>
        <div className="flex gap-2">
          <img
            src="/images/roles/Đạo tặc.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Đạo tặc (Robber)
            </span>
            : Ban đêm, Đạo tặc có thể chọn 1 là bài từ một người khác và đặt
            nhân vật của mình thế vào đó. Được quyền xem quân bài mới của mình.
            Người mang lá Đạo tặc cuối cùng sẽ theo Phe dân. Còn Đạo tặc sẽ theo
            phe lá bài mới mà mình lấy nhưng không được thực hiện chức năng vào
            Ban đêm. Đạo tặc có quyền không lấy lá bài của người chơi khác và
            vẫn đóng vai Đạo tặawjc.
          </p>
        </div>
        <div className="flex gap-2">
          <img
            src="/images/roles/Kẻ gây rối.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Kẻ gây rối (Troublemaker)
            </span>
            : Vào ban đêm, Kẻ gây rối có thể tráo 2 lá bài của hai người chơi
            nhưng không được phép nhìn những lá bài này. Những người chơi bị
            tráo bài sẽ thay đổi vai trò theo lá bài mới, mặc dù họ có thể không
            biết cho đến cuối trò chơi.
          </p>
        </div>
        <div className="flex gap-2">
          <img src="/images/roles/Cú đêm.jpg" alt="" className="card mx-auto" />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Cú đêm (Insomniac)
            </span>
            : Cú đêm thức dậy và nhìn lại lá bài của mình là lá bài gì, có bị
            xáo trộn không. Chỉ cho thẻ nhân vật này vào bộ bài nếu như bộ bài
            có những lá bài có thể làm xáo trộn quân trong đêm như Kẻ gây rối
            hoặc Đạo tặc.
          </p>
        </div>
        <div className="flex gap-2">
          <img
            src="/images/roles/Thợ săn.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Thợ săn (Hunter)
            </span>
            : Nếu Thợ săn chết, người được anh ta chỉ định sẽ chết theo.
          </p>
        </div>
        <div className="flex gap-2">
          <img src="/images/roles/Thợ hồ.jpg" alt="" className="card mx-auto" />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Thợ hồ (Mason)
            </span>
            : Có hai lá Thợ Hồ trong bộ bài và sẽ luôn được cho cùng nhau vào bộ
            bài chơi. Thợ Hồ thức dậy trong đêm và tìm kiếm người còn lại. Nếu
            không có 1 Thợ Hồ khác, có nghĩa là lá bài nằm ở giữa.
          </p>
        </div>
        <h3 className="text-xl font-semibold text-black">2. Ma sói</h3>
        <div className="flex gap-2">
          <img src="/images/roles/Ma sói.jpg" alt="" className="card mx-auto" />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Ma sói (Werewolf)
            </span>
            : vào ban đêm tất cả Ma sói mở mắt và tìm những Ma sói khác. Nếu
            không có Ma sói khác thì có nghĩa là quân Ma sói đang ở bộ bài thừa.
            <br />
            Nếu chỉ có duy nhất một Ma sói ( Đơn sói ), Sói sẽ được xem 1 lá bài
            ở giữa nhằm giúp Ma sói xác định vai trò những người chơi còn lại.
          </p>
        </div>
        <div className="flex gap-2">
          <img
            src="/images/roles/Kẻ phản bội.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Kẻ phản bội (Minion)
            </span>
            : Thức dậy ngay sau Sói, Sói lúc này sẽ giơ ngón cái lên để Kẻ phản
            bội nhận biết. Nếu Kẻ phản bội chết và không có Sói chết, phe Sói sẽ
            thắng. Nếu không có ai là Sói và có một nhân vật khác chết, Kẻ Phản
            bội sẽ thắng. Kẻ Phản bội là nhân vật đắc lực hỗ trợ cho Ma sói.
          </p>
        </div>
        <h3 className="text-xl font-semibold text-black">
          3. Những chức năng đặc biệt
        </h3>
        <div className="flex gap-2">
          <img
            src="/images/roles/Kẻ chán đời.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Kẻ chán đời (Tanner)
            </span>
            : Nhân vật này vô cùng lạ lùng. Một nhân vật chẳng thiết tha sống gì
            cả. Nếu nhân vật này chết mà không có Sói chết, thì anh ta thắng.
            Nếu nhân vật này chết và Sói chết, thì phe Dân làng thắng và anh ta
            cũng thắng ( vì cũng là phe Dân làng). Nhưng nếu Kẻ sầu đời chết mà
            Sói đều nằm giữa, thì Dân làng thua. Có thể coi nhân vật này như một
            phe riêng.
          </p>
        </div>
        <div className="flex gap-2">
          <img
            src="/images/roles/Bợm nhậu.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Bợm nhậu (Drunk)
            </span>
            : Say mèn và không nhớ mình là ai. Vì vậy khi tỉnh vào Ban đêm, hắn
            phải tráo lá bài của mình với 1 lá ở giữa nhưng không được phép xem
            lá bài đó là nhân vật gì.
          </p>
        </div>
        <div className="flex gap-2">
          <img
            src="/images/roles/Kẻ mạo danh.jpg"
            alt=""
            className="card mx-auto"
          />
          <p className="basis-full">
            <span className="text-black text-lg font-semibold">
              Kẻ mạo danh (Doppelganger)
            </span>
            : Kẻ mạo danh là một lá bài phức tạp bởi vì Phe của cô nàng phụ
            thuộc vào lá bài được xem. Khi mạo danh sẽ thức dậy đầu tiên vào ban
            Đêm. Kẻ mạo danh được phép nhìn nhưng không được tráo đổi lá bài của
            một người khác. Nếu là bài được xem là: <br />
            <span className="text-black font-semibold">
              Dân làng, Kẻ chán đời, Thợ săn
            </span>
            : thì Kẻ mạo danh sẽ đóng vai nhân vật đó và không tiếp tục làm gì
            vào ban đêm. <br />
            <span className="text-black font-semibold">Ma sói, Thợ Hồ</span>:
            Khi bốc phải 1 trong 2 lá bài này, Kẻ mạo danh sẽ đóng vai trò của
            lá bài đó và thức dậy 1 lần nữa khi được gọi tên tương ứng. <br />{" "}
            <span className="text-black font-semibold">
              Nhà tiên tri, Đạo tặc, Kẻ phá rối, Tên bợm nhậu
            </span>
            : Thực hiện chức năng của nhân vật này ngay lập tức khi bốc trúng
            nhân vật đó và không thức dậy lần nào nữa trong đêm. <br />{" "}
            <span className="text-black font-semibold">Kẻ phản bội</span>: Kết
            thúc lượt của Kẻ mạo danh, thông thường Quản trò sẽ yêu cầu nhắm mắt
            lại. Tuy nhiên, nếu Kẻ mạo danh bốc phải Kẻ phản bội, Quản trò sẽ
            không hô như vậy, khi đó Ma Sói giơ ngón tay cái lên. Lúc này Kẻ mạo
            danh thuộc phe Ma sói.
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-orange-500">
          3. Thiết lập trước khi chơi
        </h2>
        <h3 className="text-xl font-semibold text-black">
          Số lượng người chơi
        </h3>
        <p>
          Ma sói One Night có thể chơi với số lượng từ 3 - 10 người chơi. Tuy
          nhiên nếu bạn chỉ mới bắt đầu học chơi, hãy chơi với một nhóm nhỏ
          khoảng 3-5 người chơi để tìm hiểu rõ luật hơn. <br />
          Ngoài ra cần cử một người nắm rõ luật chơi khác đóng vai trò Quản trò,
          là người điều phối ván chơi. Nếu không đủ số người, Quản trò có thể
          chính là một người chơi được cử làm đại diện.
        </p>
        <h3 className="text-xl font-semibold text-black">Bộ bài chơi</h3>
        <p>
          Để bắt đầu ván chơi, chúng ta cần thiết lập Bộ bài chơi Ma sói theo số
          lượng người chơi. Bộ bài chơi luôn cần phải có số lượng lớn hơn số
          lượng người chơi là 3 lá. Ngoài ra cần lấy ra những thẻ bài tròn tương
          ứng với các lá bài chơi được chọn.
        </p>
        <h2 className="text-2xl font-semibold text-orange-500">
          4. Tiến trình chơi 1 ván Werewolf One Night``
        </h2>
        <h3 className="text-xl font-semibold text-black">Bắt đầu trò chơi</h3>
        <p>
          Xáo trộn bộ bài đã thiết lập ban đầu và chia cho mỗi người chơi 1 lá.
          Đặt 3 lá còn lại và tất cả những thẻ tròn của các nhân vật tương ứng
          vào chính giữa. <br />
          Mổi người chơi bí mật xem lá bài của mình rồi đặt lá bài của mình úp
          xuống gần với 3 lá bài còn lại ở giữa, sao cho tất cả người chơi có
          thể dễ dàng chạm đến các lá bài trên bàn.
        </p>
        <h3 className="text-xl font-semibold text-black">
          Thứ tự thức dậy bao gồm
        </h3>
        <p>
          1.Kẻ mạo danh: nếu bộ bài có quân bài này. Kẻ mạo danh xem 1 lá bài
          của người chơi khác và thực hiện chức năng phù hợp.<br />2.Ma sói: Các Ma
          sói mở mắt và tìm kiếm đồng đội. Có thể không có ai cả.<br />3.Kẻ phản bội:
          Tỉnh dậy và kiểm tra xem ai là Ma Sói. Ma sói sẽ giơ 1 ngón cái lên
          làm tín hiệu.<br />4.Thợ Hồ: Tỉnh dậy và tìm kiếm Thợ Hồ còn lại.<br />5.Tiên
          tri: Tỉnh dậy và xem 1 lá bài của người khác hoặc xem 2 trong số 3 lá
          ở giữa.<br />6.Đạo tặc: Hoán đổi một lá bài của người khác với mình và xem
          lá bài đó.<br />7.Kẻ phá rối: Tỉnh dậy và hoán đổi 2 lá bài của 2 người
          chơi.<br />8.Bợm nhậu: Tỉnh dậy và tráo lá bài của mình lấy 1 lá bài từ bộ
          bài ở giữa.<br />9.Cú đêm: Dậy và xem lại lá bài của mình xem có bị tráo đổi
          hay không.
        </p>
        <h3 className="text-xl font-semibold text-black">Phe dân thắng khi</h3>
        <p>
          + Có ít nhất 1 Ma Sói bị chết trên bàn chơi: Bị treo cổ hoặc bị Thợ
          săn bắn chết. <br />+ Nếu không có Ma Sói nào chết hoặc không có ai
          chết và tất cả lá bài Ma sói ở 3 lá bài giữa.
        </p>
        <h3 className="text-xl font-semibold text-black">Phe sói thắng khi</h3>
        <p>
          Có ít nhất 1 người chơi là Sói và có 1 người không phải là Sói chết.
        </p>
        <h3 className="text-xl font-semibold text-black">
          Phe đặc biệt thắng khi
        </h3>
        <p>
          Nếu bạn chơi với quân Kẻ chán đời, thì sẽ có trường hợp phe Chán đời
          dành chiến thắng. Đó là khi nhân vật này chết mà không có Sói chết,
          thì anh ta thắng.
        </p>
      </div>
    </div>
  );
}
