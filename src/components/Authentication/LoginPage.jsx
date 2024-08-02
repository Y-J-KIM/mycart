import { useRef, useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { login } from "../../service/userServices";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(user);
  // };

  const passwordRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitData = async (formData) => {
    try {
      await login(formData);
      window.location = "/";
    } catch (err) {
      setFormError(err.response.data.message);
    }
  };

  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(submitData)}>
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="form_text_input"
              placeholder="이메일 입력"
              {...register("email", { required: "이메일을 입력해주세요." })}
            ></input>
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="form_text_input"
              placeholder="패스워드"
              {...register("password", {
                required: "패스워드를 입력해주세요.",
                minLength: { value: 4, message: "패스워드는 최소 4자 이상." },
              })}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
        </div>

        {formError && <em className="form_error">{formError}</em>}
        <button
          type="submit"
          className="form_submit"
          onChange={(e) => setUser({ email: "", password: "" })}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
