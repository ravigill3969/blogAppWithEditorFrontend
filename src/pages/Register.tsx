import { RegisterFormValues, registerSchema } from "@/zod";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";

import logo from "../assets/logo.svg";
import { useRegisterUser } from "@/api/user";
import { Link } from "react-router-dom";

function Register() {
  const { mutate } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data);
  };

  return (
    <div>
      <div className="m-2">
        <img src={logo} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen justify-center items-center"
      >
        <Card className="flex flex-col min-w-[440px] p-3  border border-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Register
            </CardTitle>
            <CardDescription className="text-black text-center">
              Welcome to the blog world
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div>
              <Label>Username</Label>
              <Input placeholder="johndoe" {...register("username")} />
              {errors.username && (
                <p className="text-red-500 font-semibold flex gap-1 m-1 text-sm">
                  <TriangleAlert size={20} />
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input
                placeholder="johndoe@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 font-semibold flex gap-1 m-1 text-sm">
                  <TriangleAlert size={20} />
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input
                placeholder="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 font-semibold flex gap-1 m-1 text-sm">
                  <TriangleAlert size={20} />
                  {errors.password.message}
                </p>
              )}
            </div>
            <Link to={"/login"} className="text-sm  hover:underline">
              Already have an account?{" "}
              <span className="text-blue-700 font-bold">Login</span>
            </Link>
          </CardContent>
          <CardFooter className="text-center">
            <Button>Register</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Register;
