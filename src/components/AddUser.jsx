import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Button from "./Button";

const AddUser = ({ open, setOpen, userData }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const defaultValues = userData ?? {};

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  const handleOnSubmit = (data) => {
    console.log("Form submitted with data:", data); // Log the form data for debugging

    // Navigate to the dashboard on successful form submission
    navigate("/dashboard");

    // Optionally close the modal after submission
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className='p-4'>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
        </Dialog.Title>
        <div className='flex flex-col gap-4'>
          <Textbox
            placeholder='Full name'
            type='text'
            name='name'
            label='Full Name'
            className='w-full rounded'
            register={register("name", { required: "Full name is required!" })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder='Title'
            type='text'
            name='title'
            label='Title'
            className='w-full rounded'
            register={register("title", { required: "Title is required!" })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder='Email Address'
            type='email'
            name='email'
            label='Email Address'
            className='w-full rounded'
            register={register("email", { required: "Email Address is required!" })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder='Role'
            type='text'
            name='role'
            label='Role'
            className='w-full rounded'
            register={register("role", { required: "User role is required!" })}
            error={errors.role ? errors.role.message : ""}
          />
        </div>
        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
          <Button
            type='submit'
            className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
            label='Submit'
          />
          <Button
            type='button'
            className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
            onClick={() => setOpen(false)}
            label='Cancel'
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
