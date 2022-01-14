import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { PaymentService } from "../services";
import { useSnackbar } from "notistack";

const CancelPaymentCallback = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const cancelPayment = async () => {
      try {
        const result = await PaymentService.CancelPayment();
        enqueueSnackbar("Payment was canceled", { variant: "success" });
      } catch (e) {
        console.log(e);
      }
      navigate("/profile");
    };

    cancelPayment();
  }, []);

  return (
    <Container>
      <Typography>Processing payment...</Typography>
    </Container>
  );
};

export { CancelPaymentCallback };
