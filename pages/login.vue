<script setup>
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Must be a valid email!").max(50),
});

const supabase = useSupabaseClient();
const isLoading = ref(false);
const isEmailSubmitted = ref(false);
const state = reactive({
  email: undefined,
});

const validate = (state) => {
  const errors = [];
  const parsedState = schema.safeParse(state);

  !parsedState.success &&
    parsedState.error.errors.forEach((err) =>
      errors.push({ path: err.path[0], message: err.message }),
    );
  return errors;
};

async function onSubmit(e) {
  isLoading.value = true;
  const { email } = e.data;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "http://localhost:3000/confirm",
    },
  });

  if (error) {
    console.error(error);
  } else {
    isEmailSubmitted.value = true;
  }

  isLoading.value = false;
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <UCard v-if="!isEmailSubmitted">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UButton type="submit" block :loading="isLoading" :disabled="isLoading">
          Login
        </UButton>
      </UForm>
    </UCard>

    <UCard v-else>
      <div class="p-16 text-center">
        <UIcon class="mb-4 h-12 w-12" name="i-heroicons-inbox-arrow-down" />
        <p class="text-xl">Please check your inbox!</p>
      </div>
    </UCard>
  </div>
</template>
