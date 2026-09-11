import Image from "next/image";

// Nguồn: roiser-html-package/roiser/index.html, <div class="sponsor-section"> (dòng 579-615)
// CSS: main.css .sponsor-wrap / .sponsor-item (dòng 6642-6687), .bd-right / .bd-bottom (dòng 514-524)
// Lưới grid 5 cột: 4 item đầu bd-right+bd-bottom, item 5 chỉ bd-bottom (hết cột),
// 4 item tiếp bd-right, item cuối không border (hết hàng + hết cột).
const sponsors = [
  { image: "/assets/img/sponsor/sponsor-1.png", width: 101, height: 42, className: "bd-right bd-bottom" },
  { image: "/assets/img/sponsor/sponsor-2.png", width: 136, height: 34, className: "bd-right bd-bottom" },
  { image: "/assets/img/sponsor/sponsor-3.png", width: 133, height: 31, className: "bd-right bd-bottom" },
  { image: "/assets/img/sponsor/sponsor-4.png", width: 190, height: 39, className: "bd-right bd-bottom" },
  { image: "/assets/img/sponsor/sponsor-5.png", width: 129, height: 30, className: "bd-bottom" },
  { image: "/assets/img/sponsor/sponsor-6.png", width: 151, height: 29, className: "bd-right" },
  { image: "/assets/img/sponsor/sponsor-7.png", width: 167, height: 43, className: "bd-right" },
  { image: "/assets/img/sponsor/sponsor-8.png", width: 167, height: 44, className: "bd-right" },
  { image: "/assets/img/sponsor/sponsor-9.png", width: 163, height: 45, className: "bd-right" },
  { image: "/assets/img/sponsor/sponsor-10.png", width: 129, height: 39, className: "" },
];

export default function SponsorSection() {
  return (
    <div className="sponsor-section pt-100">
      <div className="container">
        <div className="row sponsor-wrap">
          {sponsors.map((sponsor) => (
            <div key={sponsor.image} className={`sponsor-item ${sponsor.className}`.trim()}>
              <a href="#">
                <Image src={sponsor.image} alt="img" width={sponsor.width} height={sponsor.height} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
