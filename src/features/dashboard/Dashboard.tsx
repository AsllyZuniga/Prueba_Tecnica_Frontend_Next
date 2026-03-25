'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  MemberProfileSidebar,
  MembershipPlanSidebar,
  ProductEditSidebar,
  SidebarContainer,
  WorkOrderEditSidebar,
} from '@/src/components/operations'
import { Card } from '@/src/components/common'

type FlowStep = 'container' | 'incident' | 'work-order' | 'membership' | 'member-profile'
type FlowId = 'incident' | 'membership'

const FLOW_CONFIG: Record<FlowId, { title: string; description: string; steps: FlowStep[] }> = {
  incident: {
    title: 'Flujo de incidencias',
    description: 'Paso 1/3 Sala · Paso 2/3 Incidencia · Paso 3/3 Orden de trabajo',
    steps: ['container', 'incident', 'work-order'],
  },
  membership: {
    title: 'Flujo de membresías',
    description: 'Paso 1/2 Plan · Paso 2/2 Perfil del miembro',
    steps: ['membership', 'member-profile'],
  },
}

export const Dashboard: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [activeFlow, setActiveFlow] = useState<FlowId | null>(null)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const currentFlowConfig = activeFlow ? FLOW_CONFIG[activeFlow] : null
  const currentStep = currentFlowConfig ? currentFlowConfig.steps[activeStepIndex] : null
  const isOpen = Boolean(currentFlowConfig)

  useEffect(() => {
    const flowParam = searchParams.get('flow')
    const requestedFlow = flowParam === 'incident' || flowParam === 'membership' ? flowParam : null

    if (!requestedFlow) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('flow', 'incident')
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname)
      return
    }

    if (requestedFlow && requestedFlow !== activeFlow) {
      setActiveFlow(requestedFlow)
      setActiveStepIndex(0)
      return
    }

    if (!activeFlow) {
      setActiveFlow(requestedFlow)
      setActiveStepIndex(0)
    }
  }, [activeFlow, pathname, router, searchParams])

  const closeFlow = useCallback(() => {
    setActiveFlow(null)
    setActiveStepIndex(0)

    const params = new URLSearchParams(searchParams.toString())
    params.delete('flow')
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }, [pathname, router, searchParams])

  const goToNextStep = useCallback(() => {
    if (!currentFlowConfig || !activeFlow) return

    const nextIndex = activeStepIndex + 1
    if (nextIndex >= currentFlowConfig.steps.length) {
      closeFlow()
      return
    }

    setActiveStepIndex(nextIndex)
  }, [activeFlow, activeStepIndex, closeFlow, currentFlowConfig])

  const ActiveComponent = useMemo(() => {
    if (currentStep === 'container') return (
      <SidebarContainer
        onClose={closeFlow}
        onCreateIncident={goToNextStep}
      />
    )

    if (currentStep === 'incident') return (
      <ProductEditSidebar
        onClose={closeFlow}
        onAdvance={goToNextStep}
      />
    )

    if (currentStep === 'work-order') return (
      <WorkOrderEditSidebar
        onClose={closeFlow}
        onComplete={goToNextStep}
      />
    )

    if (currentStep === 'membership') return (
      <MembershipPlanSidebar
        onClose={closeFlow}
        onCreatePlan={goToNextStep}
      />
    )

    if (currentStep === 'member-profile') return (
      <MemberProfileSidebar
        onClose={closeFlow}
        onComplete={goToNextStep}
      />
    )

    return null
  }, [closeFlow, currentStep, goToNextStep])

  return (
    <div className="min-h-full space-y-4 relative">
      <Card className={isOpen ? 'min-h-[700px] p-0 bg-transparent border-0 shadow-none' : 'min-h-[700px] bg-transparent'}>
        {isOpen && (
          <div className="space-y-6">
            <div className="w-full max-w-[1200px] mx-auto flex justify-center">
              {ActiveComponent}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
