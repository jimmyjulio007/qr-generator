
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '100%', height: '100%', color: '#FFDD00' }}
                >
                    {/* Stylized Nano Banana: A curve with circuit nodes */}
                    <path d="M20,80 C20,50 40,20 80,10" stroke="#FFDD00" strokeWidth="12" />
                    <circle cx="20" cy="80" r="10" fill="#FFDD00" />
                    <rect x="70" y="5" width="15" height="15" rx="4" fill="black" stroke="#FFDD00" strokeWidth="4" />
                    {/* Nano dots */}
                    <circle cx="45" cy="45" r="4" fill="#000" />
                    <circle cx="35" cy="55" r="4" fill="#000" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
