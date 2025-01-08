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

import { RequestParams } from "../../configAxios";

export const onError = (t: TFunction<"translation", undefined>, enqueueSnackbar: EnqueueSnackbar) => (error: any) => {
  enqueueSnackbar(t(error?.response?.data?.message), {
    variant: "error",
  });
};

export const useCreateUsersWithListInput = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.createUsersWithListInput,
    mutationKey: [QUERY_KEYS.PET.USER.CREATE_USERS_WITH_LIST_INPUT],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { CreateUsersWithListInput: mutate, isCreateUsersWithListInputPending: isPending, ...otherProps };
};

export const useGetUserByName = (username: string, params: RequestParams = {}, isEnabled: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.PET.USER.GET_USER_BY_NAME, username, params],
    queryFn: () => petAxios.getUserByName(username, params),
    enabled: isEnabled,
  });

export const useUpdateUser = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.updateUser,
    mutationKey: [QUERY_KEYS.PET.USER.UPDATE_USER],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { UpdateUser: mutate, isUpdateUserPending: isPending, ...otherProps };
};

export const useDeleteUser = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.deleteUser,
    mutationKey: [QUERY_KEYS.PET.USER.DELETE_USER],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { DeleteUser: mutate, isDeleteUserPending: isPending, ...otherProps };
};

export const useLoginUser = (
  query: {
    /** The user name for login */
    username: string;
    /** The password for login in clear text */
    password: string;
  },
  params: RequestParams = {},
  isEnabled: boolean,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.PET.USER.LOGIN_USER, query, params],
    queryFn: () => petAxios.loginUser(query, params),
    enabled: isEnabled,
  });

export const useLogoutUser = (params: RequestParams = {}, isEnabled: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.PET.USER.LOGOUT_USER, params],
    queryFn: () => petAxios.logoutUser(params),
    enabled: isEnabled,
  });

export const useCreateUsersWithArrayInput = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.createUsersWithArrayInput,
    mutationKey: [QUERY_KEYS.PET.USER.CREATE_USERS_WITH_ARRAY_INPUT],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { CreateUsersWithArrayInput: mutate, isCreateUsersWithArrayInputPending: isPending, ...otherProps };
};

export const useCreateUser = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.createUser,
    mutationKey: [QUERY_KEYS.PET.USER.CREATE_USER],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { CreateUser: mutate, isCreateUserPending: isPending, ...otherProps };
};
