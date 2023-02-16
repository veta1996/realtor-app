import React from 'react'

const ListingItem = ({listing, key, id}) => {
    console.log(listing)
  return (
    <div>
        <p>{listing.address}</p>
        <p>{listing.regularPrice}</p>
        </div>
  )
}

export default ListingItem