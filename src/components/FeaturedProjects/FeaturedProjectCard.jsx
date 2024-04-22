import React from "react";
import { cx, css } from '@emotion/css';
import { convertHexToRGBA } from "../../util";

const FeaturedProjectCard = ({ project }) => {

  const cardHoverStyle = css`
    &:hover {
      box-shadow: ${convertHexToRGBA(project.color, 0.35)} 0px 4px 24px;
      transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  `;

  return (
    <a
      href={`/project/${project.slug}/`}
      className={cx(
        `block w-full min-h-24 p-4 mb-4 sm:mb-0 overflow-hidden rounded-2xl bg-smWhite border border-smBorder dark:bg-zinc-800 dark:border-slate-900/5`,
        cardHoverStyle
      )}
    >
      <h3 className="text-lg font-semibold">{project.name}</h3>
      <p className="text-sm">{project.description}</p>
      {project.links && (
        <div className="mt-4 w-full text-xs flex gap-2">
          {project.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="h-6 rounded-md flex text-xs gap-1 items-center px-2 py-1 bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-zinc-200 hover:ring-1 hover:ring-gray-500 dark:hover:ring-zinc-400 hover:cursor-default"
            >
              <span className="font-medium">{link.name}</span>
              <span className="h-3 w-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      )}
    </a>
  )
}

export default FeaturedProjectCard;