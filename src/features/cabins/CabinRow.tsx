import { useMutation, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import styled from "styled-components";
import { deleteCabin } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; /* Fixed '0%.6fr' typo */
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.2rem 2.4rem; /* Added padding to align content nicely with header */
  overflow: hidden;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const LevelButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

interface CabinData {
  id: number;
  created_at: string;
  name: string | null;
  description: string | null;
  image: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  discount: number | null;
}

interface CabinRowProps {
  cabin: CabinData;
}

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const [showForm, setShowForm] = useState(false);
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Successfully deleted a cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate } = mutation;
  const isLoading = mutation.status === "pending";

  return (
    <>
      <TableRow role="row">
        {image ? <Img src={image} alt={`Cabin ${name}`} /> : <div></div>}
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>${regularPrice}</Price>
        {discount ? <Discount>${discount}</Discount> : <span>&mdash;</span>}
        <LevelButtons>
          <Button
            $variation="secondary"
            $size="small"
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </Button>
          <Button
            $variation="danger"
            $size="small"
            disabled={isLoading}
            onClick={() => mutate(id)}
          >
            {isLoading ? <Spinner /> : "Delete"}
          </Button>
        </LevelButtons>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;
