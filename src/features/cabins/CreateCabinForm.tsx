import { useForm, type FieldErrors } from "react-hook-form";

import styled from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

// Beautiful wrapper container for clean dashboard forms
const Form = styled.form`
  padding: 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md, 7px);
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

// Multi-line Textarea with standard system formatting
const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  font-family: inherit;
  font-size: 1.4rem;
  height: 12rem; /* Comfortable size for typing descriptions */
  width: 100%;
  resize: vertical; /* Allows users to expand height, but prevents breaking width layouts */

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
`;

interface FormInputs {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

const CreateCabinForm = () => {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormInputs>({
      defaultValues: { discount: 0 },
    });

  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success("Successfully created a cabin!");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isLoading = status === "pending";

  const onSubmit = (data: FormInputs) => {
    mutate({
      name: data.name,
      maxCapacity: data.maxCapacity,
      regularPrice: data.regularPrice,
      discount: data.discount,
      description: data.description,
      image: data.image[0],
    });
  };

  const onError = (errors: FieldErrors<FormInputs>) => {
    console.log("Validation Failed:", errors);

    if (errors.name) {
      console.log(errors.name.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Clean text label + matched ids */}
      <FormRow label="Cabin name" id="name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow
        id="maxCapacity"
        label="Maximum capacity"
        errors={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            valueAsNumber: true,
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        id="regularPrice"
        label="Regular price"
        errors={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            valueAsNumber: true,
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow
        id="discount"
        label="Discount"
        errors={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            valueAsNumber: true,
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        id="description"
        label="Description for website"
        errors={errors?.description?.message}
      >
        <Textarea id="description" {...register("description")} />
      </FormRow>

      <FormRow id="image" label="Cabin photo" errors={errors?.image?.message}>
        <FileInput
          accept="image/*"
          id="image"
          disabled={isLoading}
          {...register("image", { required: "A cabin photo is required!" })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          style={{ background: "none", border: "1px solid #ccc" }}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} $variation="primary" type="submit">
          {isLoading ? <Spinner /> : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
