// Serverless (Vercel) — proxy para Google Places API (New) com Text Search.
// Mantém a chave no servidor (env GOOGLE_PLACES_KEY), nunca exposta no frontend.
export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*')
  const q = (req.query.q || '').toString().trim()
  if(!q){ return res.status(400).json({ error: 'query vazia' }) }
  const KEY = process.env.GOOGLE_PLACES_KEY
  if(!KEY){ return res.status(200).json({ results: [], needsKey: true }) }
  try{
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.location,places.currentOpeningHours.openNow,places.regularOpeningHours.weekdayDescriptions,places.primaryTypeDisplayName'
      },
      body: JSON.stringify({ textQuery: q, languageCode: 'pt-BR', regionCode: 'BR', maxResultCount: 20 })
    })
    const data = await r.json()
    if(data.error){ return res.status(200).json({ results: [], error: data.error.message }) }
    const results = (data.places || []).map(p => ({
      id: p.id,
      name: p.displayName?.text || '',
      address: p.formattedAddress || '',
      rating: p.rating || null,
      reviews: p.userRatingCount || 0,
      phone: p.nationalPhoneNumber || '',
      website: p.websiteUri || '',
      openNow: p.currentOpeningHours?.openNow ?? null,
      hours: (p.regularOpeningHours?.weekdayDescriptions || [])[0] || '',
      type: p.primaryTypeDisplayName?.text || '',
      lat: p.location?.latitude || null,
      lng: p.location?.longitude || null
    }))
    // ordena por nº de avaliações (proxy de relevância/ranking)
    results.sort((a,b)=> (b.reviews||0) - (a.reviews||0))
    return res.status(200).json({ results })
  }catch(err){
    return res.status(200).json({ results: [], error: String(err) })
  }
}
