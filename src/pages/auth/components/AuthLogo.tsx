import { Link } from 'react-router-dom'

interface Props {
  href?: string
}

export function AuthLogo({ href }: Props) {
  const content = (
    <>
      <div
        className='w-10 h-10 rounded-2xl flex items-center justify-center'
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
          boxShadow: '0 6px 16px rgba(124,58,237,0.4)'
        }}
      >
        <svg className='w-5 h-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2.5}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>
      <span className='text-xl font-extrabold' style={{ color: 'var(--color-text)' }}>
        TS<span style={{ color: 'var(--color-primary)' }}>Uptime</span>
      </span>
    </>
  )

  if (href) {
    return (
      <Link to={href} className='inline-flex items-center gap-2.5 mb-4 cursor-pointer'>
        {content}
      </Link>
    )
  }

  return <div className='inline-flex items-center gap-2.5 mb-4'>{content}</div>
}
