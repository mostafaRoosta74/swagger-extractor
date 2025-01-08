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

import { ApiResponse } from "../../models/pet";
import { RequestParams } from "../../configAxios";

export const onError = (t: TFunction<"translation", undefined>, enqueueSnackbar: EnqueueSnackbar) => (error: any) => {
  enqueueSnackbar(t(error?.response?.data?.message), {
    variant: "error",
  });
};

export const useUploadFile = ({ onSuccess }: { onSuccess?: (data: ApiResponse) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.uploadFile,
    mutationKey: [QUERY_KEYS.PET.PET.UPLOAD_FILE],
    onSuccess: (data: ApiResponse) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { UploadFile: mutate, isUploadFilePending: isPending, ...otherProps };
};

export const useAddPet = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.addPet,
    mutationKey: [QUERY_KEYS.PET.PET.ADD_PET],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { AddPet: mutate, isAddPetPending: isPending, ...otherProps };
};

export const useUpdatePet = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.updatePet,
    mutationKey: [QUERY_KEYS.PET.PET.UPDATE_PET],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { UpdatePet: mutate, isUpdatePetPending: isPending, ...otherProps };
};

export const useFindPetsByStatus = (
  query: {
    /** Status values that need to be considered for filter */
    status: ("available" | "pending" | "sold")[];
  },
  params: RequestParams = {},
  isEnabled: boolean,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.PET.PET.FIND_PETS_BY_STATUS, query, params],
    queryFn: () => petAxios.findPetsByStatus(query, params),
    enabled: isEnabled,
  });

export const useFindPetsByTags = (
  query: {
    /** Tags to filter by */
    tags: string[];
  },
  params: RequestParams = {},
  isEnabled: boolean,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.PET.PET.FIND_PETS_BY_TAGS, query, params],
    queryFn: () => petAxios.findPetsByTags(query, params),
    enabled: isEnabled,
  });

export const useGetPetById = (petId: number, params: RequestParams = {}, isEnabled: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.PET.PET.GET_PET_BY_ID, petId, params],
    queryFn: () => petAxios.getPetById(petId, params),
    enabled: isEnabled,
  });

export const useUpdatePetWithForm = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.updatePetWithForm,
    mutationKey: [QUERY_KEYS.PET.PET.UPDATE_PET_WITH_FORM],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { UpdatePetWithForm: mutate, isUpdatePetWithFormPending: isPending, ...otherProps };
};

export const useDeletePet = ({ onSuccess }: { onSuccess?: (data: any) => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isPending, ...otherProps } = useMutation({
    mutationFn: petAxios.deletePet,
    mutationKey: [QUERY_KEYS.PET.PET.DELETE_PET],
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: [] });
      enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: onError(t, enqueueSnackbar),
  });

  return { DeletePet: mutate, isDeletePetPending: isPending, ...otherProps };
};
