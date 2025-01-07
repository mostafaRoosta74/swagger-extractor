/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import petAxios from "../../petAxios";
import { QUERY_KEYS } from "../../constants";
import { TFunction } from "i18next";
import { EnqueueSnackbar, useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { Order } from "../../models/pet";
import { RequestParams } from "../../configAxios";

export const onError = (t: TFunction<"translation", undefined>, enqueueSnackbar: EnqueueSnackbar) => (error: any) => {
  enqueueSnackbar(t(error?.response?.data?.message), {
    variant: "error",
  });
};

export const useGetInventory = (params: RequestParams = {}, isEnabled: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.STORE.GET_INVENTORY, params],
    queryFn: () => petAxios.getInventory(params),
    enabled: isEnabled,
  });

export const usePlaceOrder = ({ onSuccess }: { onSuccess?: (data: Order) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.placeOrder,
    mutationKey: [QUERY_KEYS.STORE.PLACE_ORDER],
    onSuccess: (data: Order) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { PlaceOrder: mutate, isPlaceOrderPending: isPending, ...otherProps };
};

export const useGetOrderById = (orderId: number, params: RequestParams = {}, isEnabled: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.STORE.GET_ORDER_BY_ID, orderId, params],
    queryFn: () => petAxios.getOrderById(orderId, params),
    enabled: isEnabled,
  });

export const useDeleteOrder = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.deleteOrder,
    mutationKey: [QUERY_KEYS.STORE.DELETE_ORDER],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { DeleteOrder: mutate, isDeleteOrderPending: isPending, ...otherProps };
};
