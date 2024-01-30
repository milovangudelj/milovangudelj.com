const sanityAuthUrl = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/users/me`

export const validateSanityToken = async (token: string) => {
  const userData = await (
    await fetch(sanityAuthUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json()

  if (!userData) {
    return false
  }

  return true
}
