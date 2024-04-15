import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import axios from "axios";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { setUsername } from "../../redux/userSlice.js";
import { useDispatch } from "react-redux";

const ModalLogIn = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const logIn = (logInData) => {
    axios
      .post("http://localhost:8000/login/", logInData)
      .then(({ data }) => {
        if (data["password matches"]) {
          setErrorMessage("");
          setOpen(false);
          dispatch(setUsername(logInData.login));
          reset();
          return redirect("/public_recipes");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(logInData);
        setErrorMessage("Wrong login or password");
        reset();
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit(logIn)}>
        <ModalDialog color={"neutral"} variant={"solid"}>
          <ModalClose />
          <FormControl>
            <FormLabel>Login</FormLabel>
            <Input color="danger" variant="soft" required {...register("login")} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              color="danger"
              variant="soft"
              required
              type={"password"}
              {...register("password")}
            />
          </FormControl>
          <Button type={"submit"}>Log in</Button>
          <span style={{ color: "lightcoral" }}>{errorMessage}</span>
        </ModalDialog>
      </form>
    </Modal>
  );
};

export default ModalLogIn;
