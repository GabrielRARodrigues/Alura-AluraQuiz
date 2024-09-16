import NextLink from 'next/link'

// eslint-disable-next-line react/prop-types
export default function Link({ children, href, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NextLink href={href} passHref {...props}>
      {children}
    </NextLink>
  )
}
