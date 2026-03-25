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
import { Button, Card } from '@/src/components/common'

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
  const [lastCompletedFlow, setLastCompletedFlow] = useState<FlowId | null>(null)

  const currentFlowConfig = activeFlow ? FLOW_CONFIG[activeFlow] : null
  const currentStep = currentFlowConfig ? currentFlowConfig.steps[activeStepIndex] : null
  const isOpen = Boolean(currentFlowConfig)

  useEffect(() => {
    const flowParam = searchParams.get('flow')
    const requestedFlow = flowParam === 'incident' || flowParam === 'membership' ? flowParam : null

    if (requestedFlow && requestedFlow !== activeFlow) {
      setActiveFlow(requestedFlow)
      setActiveStepIndex(0)
      setLastCompletedFlow(null)
      return
    }

    if (!requestedFlow && activeFlow) {
      setActiveFlow(null)
      setActiveStepIndex(0)
    }
  }, [activeFlow, searchParams])

  const closeFlow = useCallback(() => {
    setActiveFlow(null)
    setActiveStepIndex(0)

    const params = new URLSearchParams(searchParams.toString())
    params.delete('flow')
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }, [pathname, router, searchParams])

  const startFlowFromHome = useCallback((flow: FlowId) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('flow', flow)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }, [pathname, router, searchParams])

  const goToPreviousStep = useCallback(() => {
    setActiveStepIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }, [])

  const goToNextStep = useCallback(() => {
    if (!currentFlowConfig || !activeFlow) return

    const nextIndex = activeStepIndex + 1
    if (nextIndex >= currentFlowConfig.steps.length) {
      setLastCompletedFlow(activeFlow)
      closeFlow()
      return
    }

    setActiveStepIndex(nextIndex)
  }, [activeFlow, activeStepIndex, closeFlow, currentFlowConfig])

  const flowProgress = useMemo(() => {
    if (!currentFlowConfig) return null

    const totalSteps = currentFlowConfig.steps.length
    const currentStepNumber = activeStepIndex + 1
    const progress = (currentStepNumber / totalSteps) * 100

    return { totalSteps, currentStepNumber, progress }
  }, [activeStepIndex, currentFlowConfig])

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

  const stepLabel = useMemo(() => {
    if (!currentFlowConfig || !flowProgress) return ''
    return `${currentFlowConfig.title} · Paso ${flowProgress.currentStepNumber} de ${flowProgress.totalSteps}`
  }, [currentFlowConfig, flowProgress])

  return (
    <div className="min-h-full space-y-4 relative">
      <Card className="space-y-1 bg-dark-700/60">
        <h1 className="text-2xl font-semibold text-white">TestNext · Operaciones</h1>
        <p className="text-sm text-gray-400">Gestiona incidencias y membresías desde el menú lateral.</p>
      </Card>

      <Card className="min-h-[700px] bg-dark-700/45">
        {!isOpen && (
          <div className="h-full min-h-[668px] p-4 md:p-6">
            <div className="w-full max-w-[1200px] mx-auto space-y-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-xl font-semibold text-white">Inicio operativo</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {lastCompletedFlow
                      ? 'Último flujo finalizado correctamente. Puedes iniciar la siguiente ejecución.'
                      : 'Supervisa el estado actual e inicia flujos desde accesos rápidos o menú lateral.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm" onClick={() => startFlowFromHome('incident')}>
                    Nueva incidencia
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => startFlowFromHome('membership')}>
                    Nueva membresía
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="space-y-2 bg-dark-900/45 shadow-none">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Incidencias abiertas</p>
                  <p className="text-3xl font-semibold text-white">12</p>
                  <p className="text-xs text-gray-400">3 críticas · 5 en progreso · 4 en revisión</p>
                </Card>
                <Card className="space-y-2 bg-dark-900/45 shadow-none">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Órdenes de trabajo</p>
                  <p className="text-3xl font-semibold text-white">7</p>
                  <p className="text-xs text-gray-400">2 por vencer SLA en las próximas 6 horas</p>
                </Card>
                <Card className="space-y-2 bg-dark-900/45 shadow-none">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Membresías pendientes</p>
                  <p className="text-3xl font-semibold text-white">5</p>
                  <p className="text-xs text-gray-400">2 altas nuevas · 3 renovaciones</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card className="space-y-3 bg-dark-900/35 shadow-none">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Accesos rápidos</p>
                    <p className="text-xs text-gray-500">Ejecución directa</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-dark-800/70 border border-dark-600/70 px-3 py-2">
                      <div>
                        <p className="text-sm text-gray-200">Flujo de incidencias</p>
                        <p className="text-xs text-gray-500">Sala → Incidencia → Orden de trabajo</p>
                      </div>
                      <Button variant="primary" size="sm" onClick={() => startFlowFromHome('incident')}>Iniciar</Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-dark-800/70 border border-dark-600/70 px-3 py-2">
                      <div>
                        <p className="text-sm text-gray-200">Flujo de membresías</p>
                        <p className="text-xs text-gray-500">Plan → Perfil del miembro</p>
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => startFlowFromHome('membership')}>Iniciar</Button>
                    </div>
                  </div>
                </Card>

                <Card className="space-y-3 bg-dark-900/35 shadow-none">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Actividad reciente</p>
                    <p className="text-xs text-gray-500">Últimos eventos</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="rounded-lg bg-dark-800/70 border border-dark-600/70 px-3 py-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-gray-200">INC-310 actualizada a En progreso</p>
                        <p className="text-xs text-gray-500">Juan Pérez · hace 12 min</p>
                      </div>
                      <span className="text-xs text-primary-500">Incidencia</span>
                    </div>
                    <div className="rounded-lg bg-dark-800/70 border border-dark-600/70 px-3 py-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-gray-200">OT-204 con evidencia cargada</p>
                        <p className="text-xs text-gray-500">Sistema · hace 24 min</p>
                      </div>
                      <span className="text-xs text-primary-500">OT</span>
                    </div>
                    <div className="rounded-lg bg-dark-800/70 border border-dark-600/70 px-3 py-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-gray-200">Plan mensual creado para nuevo miembro</p>
                        <p className="text-xs text-gray-500">Recepción · hace 42 min</p>
                      </div>
                      <span className="text-xs text-primary-500">Membresía</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {isOpen && (
          <div className="space-y-6">
            <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-base text-gray-100 font-semibold">{stepLabel}</p>
                {flowProgress && (
                  <div className="w-64 h-1 rounded-full bg-dark-700 overflow-hidden">
                    <div className="h-full bg-primary-500 transition-all duration-200" style={{ width: `${flowProgress.progress}%` }} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!flowProgress || flowProgress.currentStepNumber === 1}
                  disabledReason="No se puede volver atrás porque estás en el primer paso del flujo."
                  onClick={goToPreviousStep}
                >
                  Anterior
                </Button>
                <Button variant="neutral" size="sm" onClick={closeFlow}>Cerrar flujo</Button>
              </div>
            </div>

            <div className="w-full max-w-[1200px] mx-auto flex justify-center">
              {ActiveComponent}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
