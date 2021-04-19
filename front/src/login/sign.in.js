import { useForm } from "react-hook-form";

let count =0;

function SignIn () {
    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => alert(JSON.stringify(d));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                First Name:
                <input {...register("First Name")} />
            </label>
            <label>
                Last Name:
                <input {...register("Last Name")} />
            </label>
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

export default SignIn;