import { useForm } from "react-hook-form";

import styled from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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
  cabinImage: FileList; // Files from an <input type="file" /> come as a FileList array
}

const CreateCabinForm = () => {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea id="description" {...register("description")} />
        <Error></Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="cabinImage">Cabin photo</Label>
        <Input type="file" id="cabinImage" {...register("cabinImage")} />
        <Error></Error>
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          style={{ background: "none", border: "1px solid #ccc" }}
        >
          Cancel
        </Button>
        <Button $variation="primary" type="submit">
          Create cabin
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
