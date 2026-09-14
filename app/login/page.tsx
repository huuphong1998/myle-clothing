import Image from "next/image";

// Nguồn: roiser-html-package/roiser/login.html (backlog task 0.8). Giữ nguyên class/cấu trúc
// HTML gốc (login-area, login-wrap, google-login). Form tĩnh, CHƯA xử lý submit (đúng backlog)
// — nối Supabase Auth (email/password + OAuth Google/Facebook) thuộc backlog task 1.6.
// Lưu ý nguồn: ô Password dùng type="text" (không phải "password") — giữ verbatim theo source,
// không tự sửa. Source chỉ có nút Google (không có Facebook dù spec.md mục 3 có nhắc) vì đó là
// UI thật duy nhất có trong template; việc thêm OAuth Facebook là quyết định của task 1.6.
export default function LoginPage() {
  return (
    <>
      <section className="page-header">
        <div className="shape">
          <img src="/assets/img/shapes/page-header-shape.png" alt="shape" />
        </div>
        <div className="container">
          <div className="page-header-content">
            <h1 className="title">Account Login</h1>
            <h4 className="sub-title">
              <span className="home">
                <a href="#">
                  <span>Home</span>
                </a>
              </span>
              <span className="icon">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="inner">
                <span>Account Login</span>
              </span>
            </h4>
          </div>
        </div>
      </section>

      <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="login-wrap text-center">
            <h3 className="title">Login Into Your Account</h3>
            <a href="#" className="google-login">
              <Image src="/assets/img/icon/google.png" alt="google" width={20} height={20} />
              Login with Google
            </a>
            <span className="or-text">OR</span>
            <form action="mail.php" className="login-form">
              <div className="form-item">
                <h4 className="form-header">Username or email address</h4>
                <input type="text" id="text" name="text" className="form-control" placeholder="" />
              </div>
              <div className="form-item">
                <h4 className="form-header">Password*</h4>
                <input type="text" id="text-2" name="text-2" className="form-control" placeholder="" />
              </div>
              <div className="form-item">
                <div className="checkbox-wrap">
                  <input type="checkbox" id="remember-login" name="remember-login" value="Bike" />
                  <label htmlFor="remember-login"> Remember me</label>
                  <br />
                </div>
              </div>
              <div className="submit-btn">
                <button className="rr-primary-btn">Login Account</button>
              </div>
              <a href="#" className="forgot">
                Lost your password?
              </a>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
