import { useForm } from "react-hook-form";

let count =0;

function Login () {
    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => alert(JSON.stringify(d));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email:
                <input {...register("login")} />
            </label>
            <label>
                Password:
                <input {...register("password")} />
            </label>
            
            <input type="submit" value="submit" />

        </form>
    );
}

export default Login;