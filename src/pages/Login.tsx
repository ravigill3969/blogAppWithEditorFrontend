import { LoginFormValues, loginSchema } from "@/zod";
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
import {  TriangleAlert } from "lucide-react";

import logo from "../assets/logo.svg";
import { Link, Navigate } from "react-router-dom";
import { useLoginUser } from "@/api/user";
import useAppStore from "@/zustand/zustand";
// import { useEffect } from "react";

function Login() {
  const { mutate, isPending } = useLoginUser();

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  if(isLoggedIn){
    return <Navigate to={'/'}/>
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
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
        <Card className="flex flex-col min-w-[440px] p-3 border border-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-black text-center">
              Welcome back to the blog world
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
            <Link to={"/register"} className="text-sm  hover:underline">
              Don&apos;t have an account?{" "}
              <span className="text-red-700 font-bold">Register</span>
            </Link>
          </CardContent>
          <CardFooter className="text-center">
            <Button disabled={isPending}>Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Login;
